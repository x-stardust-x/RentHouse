import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HouseService } from '../../@service/house.service';

@Component({
  selector: 'app-rental-matching-component',
  imports: [],
  templateUrl: './rental-matching-component.html',
  styleUrl: './rental-matching-component.scss',
})
export class RentalMatchingComponent implements OnInit {

  city: string = '';
  rentalItemCount: number = 0;
  viewMode: 'grid' | 'map' = 'grid';


  activeHouses = signal<any[]>([]);


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

        const approvedList = data.filter((house: any) => house.status === 2);


        this.activeHouses.set(approvedList);


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


  // 放大狀態 (裝放大照片的網址)
  lightboxImage = signal<string | null>(null);

  // 啟動放大魔法
  openLightbox(imageUrl: string) {
    this.lightboxImage.set(imageUrl);
  }

  // 關閉放大
  closeLightbox() {
    this.lightboxImage.set(null);
  }

  navigateToDetail(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/rental-matching-detail', id]);
    } else {
      console.warn('找不到該房屋的 ID');
    }

  }

  // items = this.houses;
}
