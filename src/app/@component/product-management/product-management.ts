import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HouseService } from '../../@service/house.service';
import Swal from 'sweetalert2'; // 🌟 記得引入美美的彈窗！

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-management.html',
  styleUrl: './product-management.scss'
})
export class ProductManagementComponent implements OnInit {

  products = signal<any[]>([]);
  accountId: number = 0;

  constructor(
    private router: Router,
    private houseService: HouseService
  ) {}

  ngOnInit() {

    const token = localStorage.getItem('token');

    if (token) {
      try {

        const payload = JSON.parse(atob(token.split('.')[1]));
        this.accountId = Number(payload.AccountId); // 抓取真實會員 ID

        if (this.accountId > 0) {

          this.loadProducts();
        } else {
          console.error('⚠️ Token 解碼成功，但裡面沒有夾帶 AccountId！');
        }
      } catch (e) {
        console.error('⚠️ 解析 Token 失敗', e);
      }
    } else {
      // 🌟 如果沒登入（找不到 token）
      Swal.fire({
        title: '尚未登入',
        text: '請先登入後再查看您的技能/工具列表喔！',
        icon: 'warning',
        confirmButtonText: '前往登入'
      }).then(() => {
        // 實務上可以直接把他踢回登入頁面
        this.router.navigate(['/login']);
      });
    }
  }

  // 呼叫我們剛剛在 C# 寫好的 GetProductsByAccountId
  loadProducts() {
    console.log('準備去後端撈資料，目前的真實 accountId 是：', this.accountId);
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
    // 🌟 4. 把醜醜的 confirm 換成高級的 Swal 詢問視窗
    Swal.fire({
      title: '確定要刪除嗎？',
      text: '刪除後將無法恢復這項技能/工具紀錄！',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '是的，刪除！',
      cancelButtonText: '取消'
    }).then((result: any) => {
      if (result.isConfirmed) {
        // 如果使用者按下了「是的，刪除！」才呼叫 API
        this.houseService.deleteProduct(id).subscribe({
          next: () => {
            Swal.fire('已刪除！', '您的項目已被刪除。', 'success');
            this.loadProducts(); // 刪除完重新載入列表
          },
          error: (err) => Swal.fire('錯誤', '刪除失敗，請稍後再試。', 'error')
        });
      }
    });
  }
}
