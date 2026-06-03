import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
// 🌟 1. 記得把你的 ProductService 給 Import 進來！(請確認路徑是否正確)
import { HouseService } from '../../@service/house.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-management.html',
  styleUrl: './product-management.scss'
})
export class ProductManagementComponent implements OnInit {

  products = signal<any[]>([]);
  accountId: number = 101; // 準備一個變數裝會員 ID

  constructor(
    private router: Router,
    private houseService: HouseService  // 🌟 2. 注入 Service
  ) {}

  ngOnInit() {

      this.loadProducts();      // 去後端撈資料！

  }

  // 🌟 4. 呼叫我們剛剛在 C# 寫好的 GetProductsByAccountId
  loadProducts() {
    console.log('準備去後端撈資料，目前的 accountId 是：', this.accountId);
    this.houseService.getProductsByAccountId(this.accountId).subscribe({
      next: (data) => {
        console.log('後端傳回來的資料長這樣：', data);
        this.products.set(data);
      },
      error: (err) => console.error('取得技能列表失敗', err)
    });
  }

  editProduct(id: number) {
    this.router.navigate(['/user-center/product'], { queryParams: { editId: id } });
  }

  deleteProduct(id: number) {
    if (confirm('確定要刪除這項技能/工具嗎？')) {
      // 🌟 5. 呼叫刪除 API
      this.houseService.deleteProduct(id).subscribe({
        next: () => {
          alert('刪除成功！');
          this.loadProducts(); // 刪除完重新載入列表
        },
        error: (err) => alert('刪除失敗')
      });
    }
  }
}
