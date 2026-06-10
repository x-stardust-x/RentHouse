import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from '../../../@service/house.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {


  productPendingPhotos: { file: File, previewUrl: string, isCover: boolean }[] = [];
  productExistingPhotos: any[] = []; // 裝舊照片用的


  productFormData: any = {
    accountId: 0,
    name: '',
    category: '工具',
    description: '',
    price: null,
    priceUnit: '次',
    deposit: 0,
    isOnline: false,
    quantity: 1,
    ownTool: '',
    requiredKnowledge: '',
    address: ''
  };


  isEditMode = false;
  editingId = 0;

  constructor(
    private houseService: HouseService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // 1. 裝上 JWT 指紋鎖，抓取真實會員 ID
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.productFormData.accountId = Number(payload.AccountId);
      } catch (e) {
        console.error('Token 解析失敗', e);
      }
    }

    // 2. 啟動自動填表機！檢查網址有沒有帶 editId
    this.route.queryParams.subscribe(params => {
      if (params['editId']) {
        this.isEditMode = true;
        this.editingId = Number(params['editId']);
        this.loadOldData(this.editingId);
      }
    });
  }

  // ============== 讀取舊資料區塊 ==============
  loadOldData(id: number) {
    this.houseService.getProductById(id).subscribe({
      next: (res: any) => {
        console.log('🕵️‍♂️ 撈回來的原始資料包裹：', res);

        // 拆解 C# 傳回來的包裹
        const p = res.product || res.Product || res;

        // 將舊資料塞入表單
        this.productFormData = {
          accountId: p.accountId || this.productFormData.accountId,
          name: p.name || '',
          category: p.category || '工具',
          description: p.description || '',
          price: p.price || null,
          priceUnit: p.priceUnit || '次',
          deposit: p.deposit || 0,
          isOnline: p.status === 1 || p.isOnline || false,
          quantity: p.quantity || 1,
          ownTool: p.ownTool || '',
          requiredKnowledge: p.requiredKnowledge || '',
          address: p.address || ''
        };

        // 把舊照片接住，畫面上才會顯示
        this.productExistingPhotos = res.images || res.Images || [];

        this.cdr.detectChanges(); // 刷新畫面
      },
      error: (err) => console.error('找不到這筆舊資料', err)
    });
  }

  // ============== 新照片處理區塊 ==============
  onProductFilesSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.productPendingPhotos.push({
            file: file,
            previewUrl: e.target.result,
            isCover: this.productPendingPhotos.length === 0
          });
          this.cdr.detectChanges();
        };
        reader.readAsDataURL(file);
      }
    }
  }

  setProductPendingCover(selectedIndex: number) {
    this.productPendingPhotos.forEach((photo, index) => {
      photo.isCover = (index === selectedIndex);
    });
  }

  removeProductPendingPhoto(index: number) {
    const isDeletingCover = this.productPendingPhotos[index].isCover;
    this.productPendingPhotos.splice(index, 1);
    if (isDeletingCover && this.productPendingPhotos.length > 0) {
      this.productPendingPhotos.forEach(p => p.isCover = false);
      this.productPendingPhotos[0].isCover = true;
    }
  }

  // ============== 舊照片處理區塊 ==============
  removeExistingPhoto(photoId: number, index: number) {
    if (confirm('確定要刪除這張舊照片嗎？這會直接從伺服器移除喔！')) {
      this.houseService.deleteProductImage(photoId).subscribe({
        next: () => {
          this.productExistingPhotos.splice(index, 1); // 從畫面上移除
          this.cdr.detectChanges();
        },
        error: () => alert('刪除失敗，請稍後再試')
      });
    }
  }

  // ============== 表單送出區塊 ==============
  submitProductForm() {

    if (this.productFormData.accountId === 0) {
      Swal.fire({
        title: '尚未登入',
        text: '您尚未登入或登入已過期，請先登入後再操作！',
        icon: 'warning',
        confirmButtonText: '我知道了',
        confirmButtonColor: '#f39c12'
      });
      return;
    }


    if (!this.productFormData.name || this.productFormData.price === null) {
      Swal.fire('資料不完整', '請至少填寫「資產名稱」與「計價金額」喔！', 'warning');
      return;
    }

    if (this.isEditMode) {

      this.houseService.updateProduct(this.editingId, this.productFormData).subscribe({
        next: () => {
          if (this.productPendingPhotos.length > 0) {
            let completedUploads = 0;
            this.productPendingPhotos.forEach(photo => {
              this.uploadAndBindProductPhoto(this.editingId, photo.file, photo.isCover, () => {
                completedUploads++;
                if (completedUploads === this.productPendingPhotos.length) {
                  Swal.fire({
                    title: '修改成功！',
                    text: '資產資料與新照片已成功更新。',
                    icon: 'success',
                    confirmButtonText: '回到列表',
                    confirmButtonColor: '#f07b3f'
                  }).then(() => this.router.navigate(['/user-center/products-list']));
                }
              });
            });
          } else {
            Swal.fire({
              title: '修改成功！',
              text: '資產資料已成功更新。',
              icon: 'success',
              confirmButtonText: '回到列表',
              confirmButtonColor: '#f07b3f'
            }).then(() => this.router.navigate(['user-center/products-list']));
          }
        },
        error: () => Swal.fire('錯誤', '修改失敗，請檢查後端狀態！', 'error')
      });
    } else {

      this.houseService.createProduct(this.productFormData).subscribe({
        next: (res: any) => {
          const newProductId = res?.product?.id || res?.product?.Id || res?.Product?.id || res?.Product?.Id;
          if (this.productPendingPhotos.length > 0 && newProductId) {
            let completedUploads = 0;
            this.productPendingPhotos.forEach(photo => {
              this.uploadAndBindProductPhoto(newProductId, photo.file, photo.isCover, () => {
                completedUploads++;
                if (completedUploads === this.productPendingPhotos.length) {
                  Swal.fire({
                    title: '申請已送出！',
                    text: '資產申請已送出，等待審核中。',
                    icon: 'success',
                    confirmButtonText: '回到列表',
                    confirmButtonColor: '#f07b3f'
                  }).then(() => this.router.navigate(['user-center/products-list']));
                }
              });
            });
          } else {
            Swal.fire({
              title: '申請已送出！',
              text: '資產申請已成功送出 (未附照片)，等待審核中。',
              icon: 'success',
              confirmButtonText: '回到列表',
              confirmButtonColor: '#f07b3f'
            }).then(() => this.router.navigate(['user-center/products-list']));
          }
        },
        error: () => Swal.fire('錯誤', '新增失敗，請檢查後端狀態！', 'error')
      });
    }
  }
  cancelEdit() {
    this.router.navigate(['/user-center/products-list']);
  }

  // ============== API 輔助區塊 ==============
  uploadAndBindProductPhoto(productId: number, file: File, isCover: boolean, onComplete: () => void) {
    this.houseService.uploadImage(file).subscribe({
      next: (uploadRes: any) => {
        const imageUrls = uploadRes.urls || uploadRes.Urls;
        const finalUrl = imageUrls?.[0] || '';
        if (!finalUrl) { onComplete(); return; }

        const recordData = { productId, url: finalUrl, description: '房東上傳之資產照片', isCover };
        this.houseService.addProductImageRecord(recordData).subscribe({
          next: () => onComplete(),
          error: () => onComplete()
        });
      },
      error: () => onComplete()
    });
  }

  resetForm() {
    this.productFormData = {
      accountId: 1, name: '', category: '工具', description: '', price: null,
      priceUnit: '次', deposit: 0, isOnline: false, quantity: 1, ownTool: '', requiredKnowledge: '', address: ''
    };
    this.productPendingPhotos = [];
  }
}
