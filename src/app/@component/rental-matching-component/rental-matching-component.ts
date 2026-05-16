import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HouseService } from '../../@service/house.service';

@Component({
  selector: 'app-rental-matching-component',
  imports: [], // 注意：如果你有用 standalone component 才會是空的，如果有用到 CommonModule 記得加
  templateUrl: './rental-matching-component.html',
  styleUrl: './rental-matching-component.scss',
})
export class RentalMatchingComponent implements OnInit {
  // 🌟 保留你原本的 UI 控制屬性
  city: string = '';
  rentalItemCount: number = 0;
  viewMode: 'grid' | 'map' = 'grid';

  // 🌟 新增：用來裝「已上架 (Status = 2)」的真實房屋資料
  activeHouses = signal<any[]>([]);

  // 🌟 將 Router 和 HouseService 一起注入到 constructor 中
  constructor(
    private router: Router,
    private houseService: HouseService
  ) {}

  // 元件初始化的時候，自動去後端抓資料
  ngOnInit() {
    this.loadActiveHouses();
  }

  // 去後端抓資料，並且只過濾出 status === 2 的房屋
  loadActiveHouses() {
    this.houseService.getHouses().subscribe({
      next: (data) => {
        // 關鍵濾網：過濾出已核准的房屋
        const approvedList = data.filter((house: any) => house.status === 2);
        
        // 把資料存進變數裡給 HTML 畫出來
        this.activeHouses.set(approvedList);
        
        // ✨ 加碼魔法：自動更新畫面上的房屋總數！
        this.rentalItemCount = approvedList.length;
      },
      error: (err) => console.error('取得房屋列表失敗', err)
    });
  }

  // 取得首圖的輔助函式 (給 HTML 讀取圖片用的)
  getCoverUrl(house: any): string | null {
    if (house.coverUrl) return house.coverUrl;
    if (house.images && house.images.length > 0) {
      const coverImg = house.images.find((img: any) => img.isCover === true);
      return coverImg ? coverImg.url : house.images[0].url;
    }
    return null;
  }

  // 保留你原本的導航功能，並確保傳進來的 id 轉成字串
  navigateToDetail(id: any) {
    this.router.navigate(['/rental-matching-detail', id.toString()]);
  }
  // 🌟 放大魔法狀態 (裝放大照片的網址)
  lightboxImage = signal<string | null>(null);

  // 🌟 啟動放大魔法
  openLightbox(imageUrl: string) {
    this.lightboxImage.set(imageUrl);
  }

  // 🌟 關閉放大魔法
  closeLightbox() {
    this.lightboxImage.set(null);
  }
}
