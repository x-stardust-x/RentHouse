import { Component, effect, inject, SimpleChange } from '@angular/core';
import { NewsService, } from '../../../@service/news-service';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Authservice } from '../../../@service/authservice';
import { LogService } from '../../../@service/log-service';
import { switchMap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-news-component',
  imports: [DatePipe, NgClass, RouterLink, MatIconModule],
  templateUrl: './news-component.html',
  styleUrl: './news-component.scss',
})
export class NewsComponent {
  public newsev = inject(NewsService);
  public authsev = inject(Authservice);
  private logsev = inject(LogService);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  constructor() {
    this.newsev.getAll();
    effect(() => {

    })
  }
  deleteNews(id: number) {

    if (!confirm('確定要刪除嗎？')) return;

    this.newsev.delete(id).pipe(

      switchMap(() => this.authsev.getClientIPAddress()),

      switchMap(ip => {

        const logData = {
          userId: 1, // 這裡應該替換成實際的使用者 ID
          action: `刪除消息 id:${id}`,
          ipAddress: ip,
        };

        return this.logsev.postLog(logData);
      })

    ).subscribe({

      next: () => {

        console.log('Log posted successfully');

        // 重新取得列表
        this.newsev.getAll();

      },

      error: err => {
        console.error(err);
        alert('刪除失敗');
      }

    });

  }
}
