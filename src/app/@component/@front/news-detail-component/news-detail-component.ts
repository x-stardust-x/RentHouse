import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';


import { NewsService } from '../../../@service/news-service';
import { News } from '../../../@interface/news';

@Component({
  selector: 'app-news-detail',
  imports: [ RouterLink, DatePipe],
  templateUrl: './news-detail-component.html',
  styleUrl: './news-detail-component.scss'
})
export class NewsDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newsService = inject(NewsService);

  news = signal<News | null>(null);

  private allNews = signal<News[]>([]);

  ngOnInit(): void {

  // 先載入列表（上一篇/下一篇用）
  this.newsService.getAll();

  // 🔥 監聽 route id 變化
  this.route.paramMap.subscribe(params => {

    const id = Number(params.get('id'));

    this.newsService.getById(id)
      .subscribe(res => {
        this.news.set(res);
      });

  });
}

  constructor() {
    // 正確做法：用 effect / computed（Angular signal）

    setTimeout(() => {
      this.allNews.set([...this.newsService.newsData()]);
    });
  }

  // 🔥 目前文章
  current = computed(() => this.news());

  // 🔥 排序後資料（最新 → 最舊）
  sortedNews = computed(() =>
    [...this.newsService.newsData()]
      .filter(x => x.status === 1)
      .sort((a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      )
  );

  // 🔥 index
  currentIndex = computed(() => {

    const list = this.sortedNews();
    const id = this.news()?.id;

    return list.findIndex(x => x.id === id);
  });

  // 🔥 上一篇
  prevNews = computed(() => {

    const list = this.sortedNews();
    const i = this.currentIndex();

    if (i > 0) return list[i - 1];

    return null;
  });

  // 🔥 下一篇
  nextNews = computed(() => {

    const list = this.sortedNews();
    const i = this.currentIndex();

    if (i < list.length - 1) return list[i + 1];

    return null;
  });

  goDetail(id: number) {
    this.router.navigate(['/news', id]);
  }
}
