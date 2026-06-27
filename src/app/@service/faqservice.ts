import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { FAQ_C, FAQ_CDto, FAQ_I, FAQ_IDto } from '../@interface/faq';
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
    })
  }

  getAllFAQItems() {
    this.http.get<FAQ_I[]>(this.baseUrl + 'FAQ_Items').subscribe(res => {
      this.faqItems.set(res);
    });
  }

  createFAQCategory(dto : FAQ_CDto) {

    return this.http.post<FAQ_C>(this.baseUrl + 'categories', dto)
      .pipe(
        tap(res => {
          this.faqCategories.update(categories => [...categories, res]);
        })
      );
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

  updateFAQCategory(id: number, dto: FAQ_CDto) {
    return this.http.put<FAQ_C>(
      this.baseUrl + `categories/${id}`,
      dto
    ).pipe(
      tap(updated => {
        this.faqCategories.update(categories =>
          categories.map(x =>
            x.id === id ? updated : x
          )
        );
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

  deleteFAQCategory(id: number) {

    return this.http.delete(
      this.baseUrl + `categories/${id}`
    ).pipe(
      tap(() => {

        this.faqCategories.update(categories =>
          categories.filter(x => x.id !== id)
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
