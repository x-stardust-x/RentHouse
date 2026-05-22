import { Component, signal, OnInit } from '@angular/core';
import { HouseService } from '../../@service/house.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-review-component',
  imports: [],
  templateUrl: './admin-review-component.html',
  styleUrl: './admin-review-component.scss'
})
export class AdminReviewComponent implements OnInit {

  // 待審核房屋清單 (status: 1)
  pendingHouses = signal<any[]>([]);

  // 🛡️ 1. 新增：管理員權限的 signal 開關 (預設為 false)
  isAdmin = signal<boolean>(false);

  constructor(private houseService: HouseService, private http: HttpClient) {}

  ngOnInit() {
    this.checkAdminRole(); // 🛡️ 2. 初始化時，第一件事先查核身分！

    // 如果是管理員，才去後端撈取審核清單，節省效能與保護資料
    if (this.isAdmin()) {
      this.loadPendingHouses();
    }
  }
// 🛡️ 3. 新增：身分查核邏輯
  // 🛡️ 安靜版的查核邏輯：不跳警告、不轉址，只默默切換開關
  checkAdminRole() {
    const currentRole = localStorage.getItem('userRole');

    // 如果是 Admin 就設為 true，其他所有人(包含沒登入)都會被設為 false
    this.isAdmin.set(currentRole === 'Admin');
  }


  // 取得首圖網址
  getCoverUrl(house: any): string | null {
    if (house.coverUrl) return house.coverUrl;

    if (house.images && house.images.length > 0) {
      const coverImg = house.images.find((img: any) => img.isCover === true);
      // 若無設定首圖，預設回傳第一張照片
      return coverImg ? coverImg.url : house.images[0].url;
    }

    return null;
  }

  // 載入待審核房屋
  loadPendingHouses() {
    this.houseService.getHouses().subscribe({
      next: (data) => {
        const reviewList = data.filter(house => house.status !== 3);
        this.pendingHouses.set(reviewList);
      },
      error: (err) => console.error('取得待審核清單失敗', err)
    });
  }

  // ✅ 核准上架功能
  approveHouse(house: any) {
    this.http.put(`https://localhost:7215/api/RentHouse/Approve/${house.id}`, {}).subscribe({
      next: (res: any) => {
        alert('房屋已核准上架！');
        house.status = 2;
        window.location.reload();
      },
      error: (err: any) => {
        console.error(err);
        alert('核准失敗！');
      }
    });
  }

  // 強制下架功能
  takeDownHouse(house: any) {
    if (confirm('確定要將這間房屋強制下架，並移出列表嗎？')) {
      this.http.put(`https://localhost:7215/api/RentHouse/TakeDown/${house.id}`, {}).subscribe({
        next: (res: any) => {
          alert('房屋已成功下架！');
          this.pendingHouses.set(this.pendingHouses().filter((h: any) => h.id !== house.id));
        },
        error: (err: any) => {
          console.error(err);
          alert('下架失敗！');
        }
      });
    }
  }

  // 退回申請 (刪除該筆房屋與照片資料)
  rejectHouse(id: number) {
    if (confirm('🚨 確定要「退回並刪除」這筆房屋申請嗎？資料將被銷毀！')) {
      this.houseService.deleteHouse(id).subscribe({
        next: () => {
          alert('🗑️ 申請已退回並銷毀！');
          this.loadPendingHouses();
        },
        error: (err) => console.error('退回失敗', err)
      });
    }
  }
}
