import { Component, effect, inject, signal } from '@angular/core';
import { FAQService } from '../../../@service/faqservice';
import { FormsModule } from '@angular/forms';
import { FAQ_I, FAQ_IDto } from '../../../@interface/faq';
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

  // 表單
  form: FAQ_IDto = {
    categoryId: 0,
    question: '',
    answer: '',
    sortOrder: 0,
    status: 0
  };

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
      ? `修改 FAQ id:${this.id()}`
      : `新增 FAQ`;

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

        },

        error: err => {

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
  }

  deleteFAQ(id: number) {

    if (!confirm('確定刪除？')) {
      return;
    }

    this.faqService.deleteFAQ(id)
      .pipe(

        switchMap(() => this.authsev.getClientIPAddress()),

        switchMap(ip => {

          const logData = {
            userId: this.authsev.getAdminId() ?? 0, // 改成實際登入者 ID
            action: `刪除 FAQ id:${id}`,
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

        },

        error: err => {

          console.error(err);

          alert('刪除失敗');

        }

      });

  }

}
