import { Component, signal, computed, OnInit, Input } from '@angular/core';
import { HouseService } from '../../../@service/house.service';

@Component({
  selector: 'app-product-review',
  standalone: true,
  templateUrl: './product-review-component.html',
  styleUrl: './product-review-component.scss'
})
export class ProductReviewComponent implements OnInit {

  // 🌟 1. 接收父元件傳來的下拉選單狀態 (all, pending, active)
  @Input() set filterStatus(val: string) {
    this.currentStatus.set(val);
  }
  currentStatus = signal<string>('all');

  // 🌟 2. 原始資料庫 (保險箱)
  rawProducts = signal<any[]>([]);

  // 🌟 3. Computed 核心魔法：根據下拉選單自動過濾 (✅ 已升級為 Status 數字判斷)
  filteredProducts = computed(() => {
    let result = this.rawProducts();
    const status = this.currentStatus();

    if (status === 'pending') {
      // 待審核 (Status 為 0)
      result = result.filter(p => p.status === 0);
    } else if (status === 'active') {
      // 已上架 (Status 為 1)
      result = result.filter(p => p.status === 1);
    }
    return result;
  });

  // 🌟 4. 圖片放大的變數 (✅ 已經乖乖收進 Class 裡面了)
  showImageModal: boolean = false;
  fullImageUrl: string = '';       // 存放要放大的圖片網址

  constructor(private houseService: HouseService) {}

  ngOnInit() {
    this.loadAllProducts();
  }

  loadAllProducts() {
    // 呼叫你剛改好的後端 API
    this.houseService.getAllProductsForAdmin().subscribe({
      next: (data) => this.rawProducts.set(data), // 存入保險箱
      error: (err) => console.error('無法取得資產清單', err)
    });
  }

  // 核准資產
  approveProduct(id: number) {
    if (confirm('確定要核准這項資產/技能上架嗎？')) {
      this.houseService.approveProduct(id).subscribe({
        next: () => {
          alert('核准成功！已發布至前台探索大廳。');
          this.loadAllProducts(); // 重新載入，該筆資料會跑到「已上架」
        },
        error: (err) => console.error('核准失敗', err)
      });
    }
  }

  // 退回資產
  rejectProduct(id: number) {
    if (confirm('確定要退回並刪除這筆申請嗎？')) {
      this.houseService.deleteProduct(id).subscribe({
        next: () => {
          alert('已退回申請並銷毀資料！');
          this.loadAllProducts();
        },
        error: (err) => console.error('退回失敗', err)
      });
    }
  }

  // 強制下架 / 徹底刪除
  takeDownProduct(product: any) {
    if (confirm('確定要將這項資產/技能徹底刪除嗎？此動作無法復原！')) {
      // ✅ 修正 houseService 錯字
      this.houseService.takeDownProduct(product.id).subscribe({
        next: (res: any) => {
          alert('資產/技能已成功刪除！');

          // 核心魔法：過濾掉被刪除的 id，讓它從畫面上瞬間消失
          this.rawProducts.set(this.rawProducts().filter((p: any) => p.id !== product.id));
        },
        error: (err: any) => {
          console.error(err);
          alert('刪除失敗，請檢查系統連線！');
        }
      });
    }
  }

  // 打開放大鏡 (✅ 已經乖乖收進 Class 裡面了)
  openFullImage(url: string) {
    this.fullImageUrl = 'https://localhost:7215' + url;
    this.showImageModal = true;
  }

  // 關閉放大鏡 (✅ 已經乖乖收進 Class 裡面了)
  closeFullImage() {
    this.showImageModal = false;
    this.fullImageUrl = '';
  }
}
