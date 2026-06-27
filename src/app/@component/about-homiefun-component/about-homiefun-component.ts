import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PageHero } from '../../@layouts/page-hero/page-hero';

@Component({
  selector: 'app-about-homiefun',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, PageHero],
  templateUrl: './about-homiefun-component.html',
  styleUrl: './about-homiefun-component.scss' // 備註：若您的 Angular 版本低於 17，請將 styleUrl 改為 styleUrls: ['./about-homiefun.component.scss']
})
export class AboutHomiefunComponent implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    // 獲取所有具有淡入動畫效果的區塊
    const fadeElements: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.fade-in-section');

    // 精準控制 IntersectionObserver 的觸發點，防止大滿版圖塊進場時突兀閃爍
    const observerOptions: IntersectionObserverInit = {
      root: null, // 以瀏覽器 Viewport 作為監聽主體
      rootMargin: '-40px 0px', // 稍做內縮，讓使用者滾動到視覺焦點時優雅 滑入
      threshold: 0.1 // 元素面積出現 10% 即啟動緩動
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 注入 visible class，啟動 SCSS 中的高級三次貝茲曲線過渡效果
          entry.target.classList.add('is-visible');
          // 當前區塊動畫觸發完成後即解除綁定，優化前端滾動時的效能與幀率
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(element => {
      scrollObserver.observe(element);
    });
  }

  /**
   * 統一處理頁面上所有行動呼籲按鈕（CTA）的跳轉邏輯
   * @param targetUrl 預計前往的 Angular 路由路徑 (例如: '/house-list', '/register/young')
   */
  onActionClick(targetUrl: string): void {
    console.log(`[厚厝味導航系統] 使用者點擊行動呼籲，準備跳轉目的地: ${targetUrl}`);
    // 開發整合時，只需注入 Angular Router (private router: Router) 並取消下方註解即可：
    // this.router.navigate([targetUrl]);
  }
}
