import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { HouseService } from '../../@service/house.service';
import { HttpClient } from '@angular/common/http';
import { ProductReviewComponent } from './product-review/product-review-component';
import { Authservice } from '../../@service/authservice';
import { LogService } from '../../@service/log-service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-admin-review-component',
  templateUrl: './admin-review-component.html',
  styleUrl: './admin-review-component.scss',

  imports: [ProductReviewComponent]
})
export class AdminReviewComponent implements OnInit {

  private readonly authsev = inject(Authservice);
  private readonly logsev = inject(LogService);
  ipAddress = signal<string>('');

  // 1. 原始資料庫：儲存後端撈回來的「所有真實資料」，絕不被篩選器破壞

  rawHouses = signal<any[]>([]);


  currentTab = signal<string>('rooms');
  currentStatus = signal<string>('all');


  pendingHouses = computed(() => {

    if (this.currentTab() !== 'rooms') {
      return [];
    }

    // --- 以下是原本的狀態過濾邏輯 ---
    let result = this.rawHouses();


    const status = this.currentStatus();
    if (status === 'pending') {

      result = result.filter(h => h.status === 0 || h.status === 2);
    } else if (status === 'active') {

      result = result.filter(h => h.status === 1);
    }

    return result;
  });
  // 管理員權限開關
  isAdmin = signal<boolean>(false);

  constructor(private houseService: HouseService, private http: HttpClient) {}

  ngOnInit() {
    this.checkAdminRole();
    if (this.isAdmin()) {
      this.loadPendingHouses();

      this.authsev.getClientIPAddress().subscribe((ip) => {
        this.ipAddress.set(ip);
      });
    }
  }

 checkAdminRole() {
  const token = localStorage.getItem('token');
  if (!token) {
    this.isAdmin.set(false);
    return;
  }

  try {
    const decoded: any = jwtDecode(token);

    // 🌟 鎖定那個超長的 Claim 名稱
    const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    const role = decoded[roleKey];

    console.log('精準對接中');
    console.log('抓到的角色是:', role);

    // 比對角色並設定權限
    this.isAdmin.set(role?.toLowerCase() === 'admin');

  } catch (error) {
    console.error('Token 解碼失敗', error);
    this.isAdmin.set(false);
  }
}
// 新增一個變數，用來記住現在要放大的圖片網址
  selectedImageUrl: string = '';

  //  點擊縮圖時觸發的方法
  openImageModal(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }


  getCoverUrl(house: any): string | null {
    if (house.coverUrl) return house.coverUrl;
    if (house.images && house.images.length > 0) {
      const coverImg = house.images.find((img: any) => img.isCover === true);
      return coverImg ? coverImg.url : house.images[0].url;
    }
    return null;
  }

  // 載入待審核房屋
  loadPendingHouses() {
    this.houseService.getHouses().subscribe({
      next: (data) => {
        // 去除已被刪除/永久下架的 (status = 3)
        const reviewList = data.filter(house => house.status !== 3);

        // 🌟 4. 把資料存進「原始資料庫」
        this.rawHouses.set(reviewList);
      },
      error: (err) => console.error('取得待審核清單失敗', err)
    });
  }

  // 核准上架功能
  approveHouse(house: any) {
    this.http.put(`https://localhost:7215/api/RentHouse/Approve/${house.id}`, {}).subscribe({
      next: (res: any) => {
        alert('房屋已核准上架！');
        this.logsev.postLog({
          userId: 1,
          action: `房屋核准上架: ${house.name} (ID: ${house.id})`,
          ipAddress: this.ipAddress()
        }).subscribe();
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
          // 🌟 5. 下架時，更新原始資料庫
          this.logsev.postLog({
            userId: 1,
            action: `房屋強制下架: ${house.name} (ID: ${house.id})`,
            ipAddress: this.ipAddress()
          }).subscribe();
          this.rawHouses.set(this.rawHouses().filter((h: any) => h.id !== house.id));
        },
        error: (err: any) => {
          console.error(err);
          alert('下架失敗！');
        }
      });

    }
  }

  // 退回申請
  rejectHouse(id: number) {
    if (confirm('🚨 確定要「退回並刪除」這筆房屋申請嗎？資料將被銷毀！')) {
      this.houseService.deleteHouse(id).subscribe({
        next: () => {
          alert('🗑️ 申請已退回並銷毀！');
          this.logsev.postLog({
            userId: 1,
            action: `房屋退回並銷毀: ID: ${id}`,
            ipAddress: this.ipAddress()
          }).subscribe();
          this.loadPendingHouses();
        },
        error: (err) => console.error('退回失敗', err)
      });
    }
  }

  // ==========================================
  // 🌟 6. 介面控制：給 HTML 呼叫的方法
  // ==========================================
  setTab(tabName: string) {
    this.currentTab.set(tabName);
  }

  onStatusChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.currentStatus.set(selectElement.value);
  }

}
