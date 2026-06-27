import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NewsService } from '../../../@service/news-service';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { PageHero } from '../../../@layouts/page-hero/page-hero';

@Component({
  selector: 'app-front-news-component',
  imports: [DatePipe, RouterLink, PageHero],
  templateUrl: './front-news-component.html',
  styleUrl: './front-news-component.scss',
})
export class FrontNewsComponent {
  private newsService = inject(NewsService);

  readonly pageSize = 6;

  currentPage = signal(1);

  selectedCategory = signal('全部');

  categories = computed(() => {

    const list = this.newsService.newsData()
      .map(x => x.category);

    return [
      '全部',
      ...new Set(list)
    ];
  });

  ngOnInit(): void {
    this.newsService.getAll();
  }

  filteredNews = computed(() => {

    let data = this.newsService.newsData()
      .filter(x => x.status === 1);

    if (this.selectedCategory() !== '全部') {

      data = data.filter(
        x => x.category === this.selectedCategory()
      );
    }

    return data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  });

  totalPages = computed(() =>
    Math.ceil(
      this.filteredNews().length / this.pageSize
    )
  );

  pagedNews = computed(() => {

    const start =
      (this.currentPage() - 1) * this.pageSize;

    return this.filteredNews().slice(
      start,
      start + this.pageSize
    );
  });

  pageList = computed(() =>
    Array.from(
      { length: this.totalPages() },
      (_, i) => i + 1
    )
  );

  publishedNews = computed(() =>
    this.newsService.newsData()
      .filter(x => x.status === 1)
  );

  changeCategory(category: string) {

    this.selectedCategory.set(category);

    this.currentPage.set(1);
  }

  goPage(page: number) {

    if (
      page < 1 ||
      page > this.totalPages()
    ) {
      return;
    }

    this.currentPage.set(page);
  }

  getCategoryName(id: number) {

    switch (id) {
      case 1:
        return '平台公告';

      case 2:
        return '共居導覽';

      case 3:
        return '會員故事';

      default:
        return '其他';
    }
  }

}
