import { Component, OnInit } from '@angular/core';
// 記得引入你放 upgradeToVip API 的 Service
import { Authservice } from '../../@service/authservice';
import { CommonModule } from '@angular/common'; // 給 *ngIf 用的
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../@service/user-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-subscription',
  standalone: true,

  imports: [CommonModule, MatCardModule, MatButtonModule, MatTabsModule],

  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})


export class SubscriptionComponent implements OnInit {
  currentTier: number = 1;
  isLoading: boolean = false;

 constructor(
    private authService: Authservice,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const tierStr = localStorage.getItem('subscriptionTier');
    if (tierStr) this.currentTier = parseInt(tierStr, 10);


    this.route.queryParams.subscribe(params => {
      if (params['status'] === 'success' && params['tier']) {

        const upgradedTier = parseInt(params['tier'], 10);

        // 🌟 雷達啟動：先把 LocalStorage 的內容印出來看看！
        console.log('🔍 測試：userId 抓到的是 ->', localStorage.getItem('userId'));
        console.log('🔍 測試：accountId 抓到的是 ->', localStorage.getItem('accountId'));

        // ⚠️ 請根據 F12 印出來的結果，決定你要用 'userId' 還是 'accountId'
        const currentUserId = Number(localStorage.getItem('userId'));

        if (currentUserId) {
          // 這裡維持原樣，呼叫 C# 後端 API
          this.userService.upgradeUserTier(currentUserId, upgradedTier).subscribe({
            next: (res) => {
              console.log('資料庫升級完成：', res);
              this.currentTier = upgradedTier;
              localStorage.setItem('subscriptionTier', upgradedTier.toString());

              Swal.fire({
                title: '付款成功！',
                text: '🎉 綠界授權成功！您的 VIP 權限已全面解鎖！',
                icon: 'success',
                confirmButtonColor: '#4caf50',
                confirmButtonText: '開始體驗'
              }).then(() => {
                this.router.navigate(['/subscription']);
              });
            },
            error: (err) => {
              console.error('資料庫更新失敗：', err);
              Swal.fire('錯誤', '金流已授權，但開通權限時發生異常，請聯絡客服。', 'error');
            }
          });
        } else {

          Swal.fire({
            title: '找不到會員 ID',
            text: '金流已授權，但無法更新資料庫。請按 F12 檢查 LocalStorage 欄位名稱是否正確！',
            icon: 'warning'
          });
        }
      }
    });
  }

//   信用卡號： 4311-9522-2222-2222

// 有效年月： 填寫大於現在的任何日期（例如 12/35）

// 安全碼 (CVC)： 222

onUpgrade(targetTier: number): void {
    const price = targetTier === 2 ? '199' : '299';
    const tierName = targetTier === 2 ? '進階會員' : '尊榮 VIP';
    Swal.fire({
      title: '確認升級方案',
      html: `即將前往綠界科技支付 <b>NT$${price}</b> 升級「<b>${tierName}</b>」<br>確認繼續嗎？`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e91e63',
      cancelButtonColor: '#999',
      confirmButtonText: '前往結帳',
      cancelButtonText: '取消',
      reverseButtons: true
    }).then((result) => {

    if (result.isConfirmed) {
    this.isLoading = true;

      // 呼叫我們剛剛寫好的 C# API (請確認你的網址與 Port 是正確的)
      this.http.post(`https://localhost:7215/api/payment/ecpay-checkout?tier=${targetTier}`, {})
        .subscribe({
          next: (res: any) => {

            const div = document.createElement('div');
            div.innerHTML = res.form;
            document.body.appendChild(div);

            const form = document.getElementById('ecpayForm') as HTMLFormElement;
            if (form) form.submit();

            this.isLoading = false;
          },
          error: (err) => {

  Swal.fire({
    title: '訂單產生失敗',
    text: '目前無法連線到綠界金流，請稍後再試。',
    icon: 'error',
    confirmButtonColor: '#e91e63'
  });
  this.isLoading = false;
}
        });
      }
    });
  }
  onUpgradeMerchant(): void {

  Swal.fire({
    title: '升級認證商戶',
    text: '確定要花費 NT$499 註冊成為「認證商戶」嗎？ ',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#1976d2',
    cancelButtonColor: '#999',
    confirmButtonText: '確定升級',
    cancelButtonText: '取消',
    reverseButtons: true
  }).then((result) => {


    if (result.isConfirmed) {
      this.isLoading = true;


      setTimeout(() => {

        this.isLoading = false;


        Swal.fire({
          title: '升級成功！',
          text: ' 恭喜！您已成功升級為「認證商戶」，解鎖無限件數刊登與防跳單特權！',
          icon: 'success',
          confirmButtonColor: '#2e7d32',
          confirmButtonText: '開始刊登物件'
        });

        // 依據你的資料庫設計，這裡可以存入特定的身份標記
        // 例如：localStorage.setItem('role', 'merchant');

      }, 800);
    }
  });
}
}
