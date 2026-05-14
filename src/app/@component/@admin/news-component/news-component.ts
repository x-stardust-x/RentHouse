import { Component, effect, inject, SimpleChange } from '@angular/core';
import { NewsService } from '../../../@service/news-service';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-news-component',
  imports: [DatePipe, NgClass, RouterLink],
  templateUrl: './news-component.html',
  styleUrl: './news-component.scss',
})
export class NewsComponent {
  public newsev = inject(NewsService);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  constructor(){
    this.newsev.getAll();
    effect (() =>{

    })
  }
  deleteNews(id :number){
    if(confirm('確定要刪除嗎？')){
      this.newsev.delete(id).subscribe(() => {
        // 刪除成功後重新獲取新聞列表
        this.newsev.getAll();
      });
    }
  }
}
