import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { FAQ_C, FAQ_I, FAQ_IDto } from '../@interface/faq';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:7215/api/FAQ/';

  faqCategories = signal<FAQ_C[]>([]);
  faqItems = signal<FAQ_I[]>([]);

  selectedCategoryId = signal<number>(0);

  // 過濾後 FAQ
  filteredFAQItems = computed(() => {

    const categoryId = this.selectedCategoryId();
    const items = this.faqItems();

    // 全部
    if (categoryId === 0) {
      return items;
    }

    return items.filter(x => x.categoryId === categoryId);

  });

  faqCountMap = computed(() => {

    const items = this.faqItems();

    const map = new Map<number, number>();

    for (const item of items) {

      map.set(
        item.categoryId,
        (map.get(item.categoryId) ?? 0) + 1
      );

    }

    return map;
  });


  getFAQCategories() {
    this.http.get<FAQ_C[]>(this.baseUrl + 'categories').subscribe(res => {
      this.faqCategories.set(res);
      this.faqItems.set([]); // 每次切換分類都清空 FAQ 項目，避免顯示錯誤的資料
    })
  }

  getAllFAQItems() {
    this.http.get<FAQ_I[]>(this.baseUrl + 'FAQ_Items').subscribe(res => {
      this.faqItems.set(res);
    });
  }

  createFAQ(dto: FAQ_IDto) {

    return this.http.post<FAQ_I>(this.baseUrl + 'FAQ_Items', dto)
      .pipe(
        tap(res => {

          this.faqItems.update(items => [
            ...items,
            res
          ]);

        })
      );

  }

  updateFAQ(id: number, dto: FAQ_IDto) {

    return this.http.put<FAQ_I>(
      this.baseUrl + `FAQ_Items/${id}`,
      dto
    ).pipe(
      tap(updated => {

        this.faqItems.update(items =>
          items.map(x =>
            x.id === id ? updated : x
          )
        );

      })
    );

  }

  deleteFAQ(id: number) {

    return this.http.delete(
      this.baseUrl + `FAQ_Items/${id}`
    ).pipe(
      tap(() => {

        this.faqItems.update(items =>
          items.filter(x => x.id !== id)
        );

      })
    );

  }
  // getFAQsByCategory(categoryId: number){
  //   return this.http.get(this.baseUrl + `categories/${categoryId}`);
  // }
}
