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

  constructor(
    private houseService: HouseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMyHouses();
  }

  loadMyHouses() {
    this.isLoading.set(true); // 🌟 開啟轉圈圈

    this.houseService.getMyHouses().subscribe({
      next: (data) => {
        console.log('【Signal】後端傳來的資料：', data);
        this.myHouses.set(data);   // 🌟 強制發送新資料到畫面
        this.isLoading.set(false); // 🌟 強制關閉轉圈圈
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
