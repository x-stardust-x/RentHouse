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

  // 🌟 3. Computed 核心魔法：根據下拉選單自動過濾
  filteredProducts = computed(() => {
    let result = this.rawProducts();
    const status = this.currentStatus();

    if (status === 'pending') {
      // 待審核 (IsOnline 為 false)
      result = result.filter(p => p.isOnline === false);
    } else if (status === 'active') {
      // 已上架 (IsOnline 為 true)
      result = result.filter(p => p.isOnline === true);
    }
    return result;
  });

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
          this.loadAllProducts(); // 重新載入，該筆資料會消失
        },
        error: (err) => console.error('核准失敗', err)
      });
    }
  }

  // 退回資產
  rejectProduct(id: number) {
    if (confirm('確定要退回並刪除這筆申請嗎？')) {
      // 🌟 關鍵修正：把 takeDownProduct 換成 deleteProduct
      this.houseService.deleteProduct(id).subscribe({
        next: () => {
          alert('已退回申請並銷毀資料！');

          this.loadAllProducts();
        },
        error: (err) => console.error('退回失敗', err)
      });
    }

  }
  takeDownProduct(product: any) {
    if (confirm('確定要將這項資產強制下架，並移出列表嗎？')) {
      // 💡 這裡呼叫我們寫在 houseService 裡的 API，比較整潔
      this.houseService.takeDownProduct(product.id).subscribe({
        next: (res: any) => {
          alert('資產已成功下架！');

          // 🌟 核心魔法：下架時，直接更新原始資料庫的 Signal 陣列，把它過濾掉！
          // ⚠️ 注意：請確認你存放所有資產的變數名稱是不是 rawProducts
          // (如果是 products，請把下面的 rawProducts 改成 products)
          this.rawProducts.set(this.rawProducts().filter((p: any) => p.id !== product.id));
        },
        error: (err: any) => {
          console.error(err);
          alert('下架失敗！');
        }
      });
}
}
showImageModal: boolean = false;
fullImageUrl: string = '';       // 存放要放大的圖片網址

  // 打開放大鏡
  openFullImage(url: string) {
    // 🌟 記得補上後端網址前綴！
    this.fullImageUrl = 'https://localhost:7215' + url;
    this.showImageModal = true;
  }

  // 關閉放大鏡
  closeFullImage() {
    this.showImageModal = false;
    this.fullImageUrl = '';
  }
}
