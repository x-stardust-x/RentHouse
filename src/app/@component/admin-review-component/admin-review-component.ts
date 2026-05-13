import { Component, signal, OnInit } from '@angular/core';
import { HouseService } from '../../@service/house.service';

@Component({
  selector: 'app-admin-review-component',
  imports: [],
  templateUrl: './admin-review-component.html',
  styleUrl: './admin-review-component.scss'
})
export class AdminReviewComponent implements OnInit {

  // 待審核房屋清單 (status: 1)
  pendingHouses = signal<any[]>([]);

  constructor(private houseService: HouseService) {}

  ngOnInit() {
    this.loadPendingHouses();
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
        const reviewList = data.filter(house => house.status === 1);
        this.pendingHouses.set(reviewList);
      },
      error: (err) => console.error('取得待審核清單失敗', err)
    });
  }

  // 核准上架 (將狀態更新為 2)
  approveHouse(house: any) {
    if (confirm(`✅ 確定要核准【${house.name}】正式上架嗎？`)) {
      const updatedData = { ...house, status: 2 };

      this.houseService.updateHouse(house.id, updatedData).subscribe({
        next: () => {
          alert('🎉 核准成功！該房屋已正式上架提供租客瀏覽！');
          this.loadPendingHouses();
        },
        error: (err) => console.error('核准失敗', err)
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
