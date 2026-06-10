import { Component, effect, inject, signal, computed } from '@angular/core';
import { FAQService } from '../../../@service/faqservice';
import { FormsModule } from '@angular/forms';
import { FAQ_I, FAQ_IDto, FAQ_C, FAQ_CDto } from '../../../@interface/faq';
import { switchMap } from 'rxjs';
import { Authservice } from '../../../@service/authservice';
import { LogService } from '../../../@service/log-service';

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

  id = signal(0);
  editMode = signal(false);
  categoryEditMode = signal(false);
  categoryId = signal(0);
  showCategoryActions = signal(false);

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

    const action$ = this.categoryEditMode()
      ? this.faqService.updateFAQCategory(this.categoryId(), this.categoryForm)
      : this.faqService.createFAQCategory(this.categoryForm);

    const actionText = this.categoryEditMode()
      ? `修改分類: ${this.categoryForm.name}`
      : `新增分類: ${this.categoryForm.name}`;

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
        next: () => {
          console.log('Log posted successfully');
          this.closeCategoryModal();
        },
        error: (err: any) => {
          console.error(err);
          alert('操作失敗');
        }
      });

  }

  deleteFAQCategory(id: number) {

    const categoryName = this.faqService.faqCategories().find(c => c.id === id)?.name ?? id;

    if (!confirm('確定刪除此分類？')) {
      return;
    }

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
        next: () => {
          console.log('Log posted successfully');
          this.faqService.selectedCategoryId.set(0);
          this.faqService.getFAQCategories();
        },
        error: (err: any) => {
          console.error(err);
          alert('刪除失敗');
        }
      });

  }

  openModal() {
    const modal = new bootstrap.Modal(
      document.getElementById('faqModal')
    );

    modal.show();
  }

  saveFAQ() {

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
            userId: this.authsev.getAdminId() ?? 0, // 改成實際登入者 ID
            action: actionText,
            ipAddress: ip,
          };

          return this.logsev.postLog(logData);
        })

      )
      .subscribe({

        next: () => {

          console.log('Log posted successfully');

          this.closeModal();

          this.currentPage.set(1);

        },

        error: (err: any) => {

          console.error(err);

          alert('操作失敗');

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

  deleteFAQ(id: number) {

    if (!confirm('確定刪除？')) {
      return;
    }

    this.faqService.deleteFAQ(id)
      .pipe(

        switchMap(() => this.authsev.getClientIPAddress()),

        switchMap(ip => {

          const faqTitle = this.faqService.faqItems().find(x => x.id === id)?.question ?? id;
          const logData = {
            userId: this.authsev.getAdminId() ?? 0, // 改成實際登入者 ID
            action: `刪除 FAQ: ${faqTitle}`,
            ipAddress: ip,
          };

          return this.logsev.postLog(logData);
        })

      )
      .subscribe({

        next: () => {

          console.log('Log posted successfully');

          // 重新整理 FAQ 列表
          this.faqService.getAllFAQItems();
          this.currentPage.set(1);

        },

        error: (err: any) => {

          console.error(err);

          alert('刪除失敗');

        }

      });

  }

}
