import { Component, effect, inject, signal, computed } from '@angular/core';
import { FAQService } from '../../../@service/faqservice';
import { FormsModule } from '@angular/forms';
import { FAQ_I, FAQ_IDto, FAQ_C, FAQ_CDto } from '../../../@interface/faq';
import { switchMap } from 'rxjs';
import { Authservice } from '../../../@service/authservice';
import { LogService } from '../../../@service/log-service';
import { AlertService } from '../../../@service/alert-service';

declare var bootstrap: any;
@Component({
  selector: 'app-faqs-component',
  imports: [FormsModule],
  templateUrl: './faqs-component.html',
  styleUrl: './faqs-component.scss',
})
export class FAQsComponent {
  faqService = inject(FAQService);
  authsev = inject(Authservice);
  logsev = inject(LogService);
  private alert = inject(AlertService);

  id = signal(0);
  editMode = signal(false);
  categoryEditMode = signal(false);
  categoryId = signal(0);
  showCategoryActions = signal(false);
  isSubmitting = signal(false);

  currentPage = signal(1);
  pageSize = signal(3);

  // FAQ 表單
  form: FAQ_IDto = {
    categoryId: 0,
    question: '',
    answer: '',
    sortOrder: 0,
    status: 0
  };

  // 分類表單
  categoryForm: FAQ_CDto = {
    name: '',
    sortOrder: 0,
    isActive: true
  };

  filteredFAQ = this.faqService.filteredFAQItems;

  pagedFAQ = computed(() => {
    const data = this.faqService.filteredFAQItems();

    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();

    return data.slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredFAQ().length / this.pageSize());
  });

  pages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  changePage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  openAddModal() {

    this.editMode.set(false);

    this.resetForm();

    this.openModal();

  }

  openEditModal(item: FAQ_I) {

    this.editMode.set(true);

    this.id.set(item.id);
    this.form = {
      categoryId: item.categoryId,
      question: item.question,
      answer: item.answer,
      sortOrder: item.sortOrder,
      status: item.status
    };

    this.openModal();

  }

  resetForm() {

    this.form = {
      categoryId: 0,
      question: '',
      answer: '',
      sortOrder: 0,
      status: 0
    };

  }

  resetCategoryForm() {

    this.categoryForm = {
      name: '',
      sortOrder: 0,
      isActive: true
    };

  }

  openAddCategoryModal() {

    this.categoryEditMode.set(false);
    this.resetCategoryForm();
    this.openCategoryModal();

  }

  toggleCategoryActions(value?: boolean) {
    if (typeof value === 'boolean') {
      this.showCategoryActions.set(value);
      return;
    }
    this.showCategoryActions.update(v => !v);
  }

  openEditCategoryModal(category: FAQ_C) {

    this.categoryEditMode.set(true);
    this.categoryId.set(category.id);
    this.categoryForm = {
      name: category.name,
      sortOrder: category.sortOrder,
      isActive: category.isActive
    };
    this.openCategoryModal();

  }

  openCategoryModal() {
    const modal = new bootstrap.Modal(
      document.getElementById('categoryModal')
    );
    modal.show();
  }

  closeCategoryModal() {
    const modalElement = document.getElementById('categoryModal');
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
    modalInstance.hide();
  }

  saveCategoryFAQ() {

    if(this.categoryForm.name == null || this.categoryForm.name == ""){
      this.alert.warning("資料未填寫完整","請確認必填欄位皆已填寫");
      return;
    }

    const action$ = this.categoryEditMode()
      ? this.faqService.updateFAQCategory(this.categoryId(), this.categoryForm)
      : this.faqService.createFAQCategory(this.categoryForm);

    const actionText = this.categoryEditMode()
      ? `修改分類: ${this.categoryForm.name}`
      : `新增分類: ${this.categoryForm.name}`;

    this.isSubmitting.set(true);

    action$
      .pipe(

        switchMap(() => this.authsev.getClientIPAddress()),

        switchMap(ip => {

          const logData = {
            userId: this.authsev.getAdminId() ?? 0,
            action: actionText,
            ipAddress: ip,
          };

          return this.logsev.postLog(logData);
        })

      )
      .subscribe({

        next: async () => {

          this.closeCategoryModal();

          await this.alert.toastSuccess(
            this.categoryEditMode() ? '分類已更新' : '分類已新增'
          );

          this.isSubmitting.set(false);

        },

        error: (err) => {

          console.error(err);

          this.alert.error(
            this.categoryEditMode() ? '更新失敗' : '新增失敗',
            err.error?.message ?? '請稍後再試'
          );

          this.isSubmitting.set(true);

        }

      });

  }

  async deleteFAQCategory(id: number) {

    const categoryName =
      this.faqService.faqCategories().find(c => c.id === id)?.name ?? id;

    const result = await this.alert.confirm(
      '確定刪除此分類？',
      `分類：${categoryName}，刪除後無法復原`,
      '刪除',
      '取消'
    );

    if (!result.isConfirmed) return;

    this.faqService.deleteFAQCategory(id)
      .pipe(

        switchMap(() => this.authsev.getClientIPAddress()),

        switchMap(ip => {

          const logData = {
            userId: this.authsev.getAdminId() ?? 0,
            action: `刪除分類: ${categoryName}`,
            ipAddress: ip,
          };

          return this.logsev.postLog(logData);
        })

      )
      .subscribe({

        next: async () => {

          this.faqService.selectedCategoryId.set(0);
          this.faqService.getFAQCategories();

          await this.alert.toastSuccess('分類已刪除');

        },

        error: (err) => {

          console.error(err);

          this.alert.error(
            '刪除失敗',
            err.error?.message ?? '請稍後再試'
          );

        }

      });

  }

  openModal() {
    const modal = new bootstrap.Modal(
      document.getElementById('faqModal')
    );

    modal.show();
  }

  async saveFAQ() {

    if (this.isSubmitting()) return;

    if(this.form.question.trim() == "" || this.form.answer.trim() == "" || this.form.categoryId == 0){
      this.alert.warning("資料未填寫完整","請確認必填欄位皆已填寫")
      return;
    }

    this.isSubmitting.set(true);

    const action$ = this.editMode()
      ? this.faqService.updateFAQ(this.id(), this.form)
      : this.faqService.createFAQ(this.form);

    const actionText = this.editMode()
      ? `修改 FAQ: ${this.form.question}`
      : `新增 FAQ: ${this.form.question}`;

    action$
      .pipe(

        switchMap(() => this.authsev.getClientIPAddress()),

        switchMap(ip => {

          const logData = {
            userId: this.authsev.getAdminId() ?? 0,
            action: actionText,
            ipAddress: ip,
          };

          return this.logsev.postLog(logData);
        })

      )
      .subscribe({

        next: async () => {

          this.closeModal();
          this.currentPage.set(1);

          this.isSubmitting.set(false);

          await this.alert.toastSuccess(
            this.editMode() ? '更新成功' : '新增成功'
          );

        },

        error: (err) => {

          console.error(err);

          this.isSubmitting.set(false);

          this.alert.error(
            this.editMode() ? '更新失敗' : '新增失敗',
            err.error?.message ?? '請稍後再試'
          );

        }

      });

  }
  closeModal() {

    const modalElement = document.getElementById('faqModal');

    const modalInstance =
      bootstrap.Modal.getOrCreateInstance(modalElement);

    modalInstance.hide();

  }
  // ngOnInit(): void {
  //   this.loadAll();
  // }

  constructor() {
    this.loadAll();
    console.log(this.faqService.faqItems());

  }

  loadAll() {
    this.faqService.getFAQCategories();
    this.faqService.getAllFAQItems();
  }


  changeCategory(categoryId: number) {
    this.faqService.selectedCategoryId.set(categoryId);
    this.currentPage.set(1);
  }

  async deleteFAQ(id: number) {

    const result = await this.alert.confirm(
      '確定刪除？',
      'FAQ 刪除後將無法復原',
      '刪除',
      '取消'
    );

    if (!result.isConfirmed) return;

    this.faqService.deleteFAQ(id)
      .pipe(

        switchMap(() => this.authsev.getClientIPAddress()),

        switchMap(ip => {

          const faqTitle =
            this.faqService.faqItems().find(x => x.id === id)?.question ?? id;

          const logData = {
            userId: this.authsev.getAdminId() ?? 0,
            action: `刪除 FAQ: ${faqTitle}`,
            ipAddress: ip,
          };

          return this.logsev.postLog(logData);
        })

      )
      .subscribe({

        next: async () => {

          this.faqService.getAllFAQItems();
          this.currentPage.set(1);

          await this.alert.toastSuccess('FAQ 已刪除');

        },

        error: (err) => {

          console.error(err);

          this.alert.error(
            '刪除失敗',
            err.error?.message ?? '請稍後再試'
          );

        }

      });

  }

}
