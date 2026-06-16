import { Component, OnInit } from '@angular/core';
// 記得引入你放 upgradeToVip API 的 Service
import { Authservice } from '../../@service/authservice';
import { CommonModule } from '@angular/common'; // 給 *ngIf 用的
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-subscription',
  standalone: true,

  imports: [CommonModule, MatCardModule, MatButtonModule],

  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  currentTier: number = 1;
  isLoading: boolean = false;

  constructor(private authService: Authservice) {}

  ngOnInit(): void {
    // 網頁載入時，檢查現在是免費仔還是 VIP
    const tierStr = localStorage.getItem('subscriptionTier');

    if (tierStr) {
      this.currentTier = parseInt(tierStr, 10);
    }
  }

  onUpgrade(): void {
    if (confirm('確定要花費 NT$299 升級為尊榮 VIP 嗎？ (測試環境直接模擬成功)')) {
      this.isLoading = true;

      this.authService.upgradeToVip().subscribe({
        next: (res: any) => {
          alert(res.message); // 顯示後端的恭喜訊息

          // 🌟 核心動作：把前端的等級狀態改成 3，畫面按鈕會瞬間切換！
          localStorage.setItem('subscriptionTier', '3');
          this.currentTier = 3;
          this.isLoading = false;
        },
        error: (err) => {
          alert(err.error?.message || '升級失敗，請稍後再試。');
          this.isLoading = false;
        }
      });
    }
  }
}
