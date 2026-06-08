import { Component, effect, inject, signal, computed } from '@angular/core';
import { NewsService, } from '../../../@service/news-service';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Authservice } from '../../../@service/authservice';
import { LogService } from '../../../@service/log-service';
import { switchMap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-news-component',
  imports: [DatePipe, NgClass, RouterLink, MatIconModule, MatIconModule],
  templateUrl: './news-component.html',
  styleUrl: './news-component.scss',
})
export class NewsComponent {
  public newsev = inject(NewsService);
  public authsev = inject(Authservice);
  private logsev = inject(LogService);
  currentPage = signal(1);
  pageSize = signal(5);
  sortAsc = signal(false); // false = 新到舊
  constructor() {
    this.newsev.getAll();

  }

  pagedNews = computed(() => {
    const data = this.newsev.newsData();

    const sorted = data.sort((a, b) => {
      const t1 = new Date(a.createdAt).getTime();
      const t2 = new Date(b.createdAt).getTime();

      return this.sortAsc() ? t1 - t2 : t2 - t1;
    });

    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();

    return sorted.slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.newsev.newsData().length / this.pageSize());
  });

  pages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  changePage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  deleteNews(id: number) {

    if (!confirm('確定要刪除嗎？')) return;

    const newsTitle = this.newsev.newsData().find(n => n.id === id)?.title ?? id;

    this.newsev.delete(id).pipe(

      switchMap(() => this.authsev.getClientIPAddress()),

      switchMap(ip => {

        const logData = {
          userId: this.authsev.getAdminId() ?? 0, // 這裡應該替換成實際的使用者 ID
          action: `刪除消息: ${newsTitle}`,
          ipAddress: ip,
        };

        return this.logsev.postLog(logData);
      })

    ).subscribe({

      next: () => {

        console.log('Log posted successfully');

        // 重新取得列表
        this.newsev.getAll();

        this.currentPage.set(1); // ⭐ 避免刪完頁數錯亂

      },

      error: err => {
        console.error(err);
        alert('刪除失敗');
      }

    });

  }
  toggleSort() {
    this.sortAsc.set(!this.sortAsc());
    this.currentPage.set(1); // 很重要：切排序要回第一頁
  }
}
