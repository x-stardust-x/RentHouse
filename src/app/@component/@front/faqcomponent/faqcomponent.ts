import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FAQService } from '../../../@service/faqservice';
import { RouterLink } from "@angular/router";
import { PageHero } from '../../../@layouts/page-hero/page-hero';

@Component({
  selector: 'app-faqcomponent',
  imports: [FormsModule, RouterLink, PageHero],
  templateUrl: './faqcomponent.html',
  styleUrl: './faqcomponent.scss',
})
export class FAQComponent {
  faqService = inject(FAQService);

  keyword = signal('');

  selectedCategory = signal(0);


  activeCount = computed(() => {
    const activeCategoryIds = this.faqService.faqCategories()
      .filter(c => c.isActive)
      .map(c => c.id);

    return this.faqService.faqItems().filter(i =>
      activeCategoryIds.includes(i.categoryId) &&
      i.status === 1
    ).length;
  });

  categoryCountMap = computed(() => {
    const items = this.faqService.faqItems();

    const map = new Map<number, number>();

    for (const item of items) {
      if (item.status !== 1) continue;

      map.set(item.categoryId, (map.get(item.categoryId) ?? 0) + 1);
    }

    return map;
  });

  categories = computed(() =>
    this.faqService.faqCategories()
      .filter(x => x.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder)
  );

  faqList = computed(() => {
    const keyword = this.keyword().trim().toLowerCase();

    const activeCategoryIds = this.faqService.faqCategories()
      .filter(c => c.isActive)
      .map(c => c.id);

    let data = this.faqService.faqItems()
      .filter(x =>
        x.status === 1 &&
        activeCategoryIds.includes(x.categoryId)
      );

    if (this.selectedCategory() !== 0) {
      data = data.filter(
        x => x.categoryId === this.selectedCategory()
      );
    }

    if (keyword) {
      data = data.filter(x =>
        x.question.toLowerCase().includes(keyword) ||
        x.answer.toLowerCase().includes(keyword)
      );
    }

    return data.sort((a, b) => a.sortOrder - b.sortOrder);
  });

  constructor() {

    this.faqService.getFAQCategories();
    this.faqService.getAllFAQItems();

  }

  changeCategory(id: number) {
    this.selectedCategory.set(id);
  }
}
