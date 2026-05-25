import { Component, effect, inject, signal } from '@angular/core';
import { FAQService } from '../../../@service/faqservice';
import { FormsModule } from '@angular/forms';
import { FAQ_I, FAQ_IDto } from '../../../@interface/faq';

declare var bootstrap: any;
@Component({
  selector: 'app-faqs-component',
  imports: [FormsModule],
  templateUrl: './faqs-component.html',
  styleUrl: './faqs-component.scss',
})
export class FAQsComponent {
  faqService = inject(FAQService);

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

    if (this.editMode()) {

      this.faqService
        .updateFAQ(this.id(), this.form)
        .subscribe(() => {

          this.closeModal();

        });

    } else {

      this.faqService
        .createFAQ(this.form)
        .subscribe(() => {

          this.closeModal();

        });

    }

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

    if (confirm('確定刪除？')) {

      this.faqService
        .deleteFAQ(id)
        .subscribe();

    }

  }

}
