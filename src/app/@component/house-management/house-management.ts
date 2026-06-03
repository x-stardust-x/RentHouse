// 🌟 1. 引入 signal
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HouseService } from '../../@service/house.service';

@Component({
  selector: 'app-house-management',
  standalone: true,
  templateUrl: './house-management.html',
  styleUrl: './house-management.scss'
})
export class HouseManagementComponent implements OnInit {

  // 🌟 2. 把變數變成「發射器 (Signal)」
  myHouses = signal<any[]>([]);
  isLoading = signal<boolean>(true);
  accountId: number = 0;
  constructor(
    private houseService: HouseService,
    private router: Router
  ) {}

  ngOnInit() {


    // 🌟 1. 改成去拿 'token' 抽屜裡的資料
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // 🌟 2. 像特務一樣解碼這張數位身分證 (JWT 的第二段是夾帶的資料)
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('🕵️‍♂️ 解碼成功！身分證裡面的資料長這樣：', payload);

        // 🌟 3. 抓取身分證裡的 AccountId，並把它轉換成數字 (Number)
        this.accountId = Number(payload.AccountId);

        if (this.accountId) {
          console.log('✅ 成功拿到會員 ID：', this.accountId);
          this.loadMyHouses(); // 拿到 ID 後，才去呼叫後端撈房子
        } else {
          console.error('⚠️ Token 解碼成功，但裡面沒有夾帶會員 ID！');
        }

      } catch (e) {
        console.error('⚠️ 解析 Token 失敗，這可能不是一個有效的 JWT！', e);
      }
    } else {
      console.warn('⚠️ 找不到 token，請先登入！');
    }
  }

  loadMyHouses() {
    this.isLoading.set(true); // 🌟 開啟轉圈圈


    this.houseService.getMyHouses(this.accountId).subscribe({
      next: (data) => {
        console.log('【Signal】後端傳來的資料：', data);
        this.myHouses.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('讀取失敗', err);
        this.isLoading.set(false);
      }
    });
  }

  editHouse(id: number) {
    this.router.navigate(['/user-center/rent'], { queryParams: { editId: id } });
  }

  deleteMyHouse(id: number) {
    if (confirm('確定要刪除這個房源嗎？這將無法復原喔！')) {
      this.houseService.deleteHouse(id).subscribe({
        next: () => {
          alert('房源已成功刪除！');
          this.loadMyHouses();
        },
        error: (err) => alert('刪除失敗，請稍後再試')
      });
    }
  }
}
