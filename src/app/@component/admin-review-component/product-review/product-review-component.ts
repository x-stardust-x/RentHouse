import { Component, signal, computed, OnInit, Input } from '@angular/core';
import { HouseService } from '../../../@service/house.service';

@Component({
  selector: 'app-product-review',
  standalone: true,
  templateUrl: './product-review-component.html',
  styleUrl: './product-review-component.scss'
})
export class ProductReviewComponent implements OnInit {

  // 接收父元件傳來的下拉選單狀態 (all, pending, active)
  @Input() set filterStatus(val: string) {
    this.currentStatus.set(val);
  }
  @Input() viewMode: 'grid' | 'list' = 'grid';

  sortSignal = signal<string>('newToOld');
  @Input() set currentSort(value: string) {
    this.sortSignal.set(value);
  }

  currentStatus = signal<string>('all');

  currentPage = signal(1); // 目前頁碼
  pageSize = 6;

  rawProducts = signal<any[]>([]);


  filteredFullProducts = computed(() => {

    let result = [...this.rawProducts()];


    const status = this.currentStatus();
    if (status === 'pending') {
      result = result.filter(p => p.status === 0);
    } else if (status === 'active') {
      result = result.filter(p => p.status === 1);
    }


    const sortType = this.sortSignal();
    if (sortType === 'newToOld') {
      result.sort((a, b) => b.id - a.id);
    } else {
      result.sort((a, b) => a.id - b.id);
    }

    return result;
  });


  pagedProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // 從完整的資料中，切出這一頁需要的筆數
    return this.filteredFullProducts().slice(startIndex, endIndex);
  });


  get totalPages() {
    return Math.ceil(this.filteredFullProducts().length / this.pageSize);
  }

  get totalPagesArray() {
    return new Array(this.totalPages);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 跳頁後自動滾回頂部
    }
  }

  //圖片放大的變數
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
