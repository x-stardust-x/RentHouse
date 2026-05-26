import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HouseService } from '../../../@service/house.service'; // 🌟 修正路徑

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss' // 資產專屬 SCSS 剪到這
})
export class ProductFormComponent {
  productPendingPhotos: { file: File, previewUrl: string, isCover: boolean }[] = [];

  productFormData: any = {
    accountId: 1,
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

  constructor(private houseService: HouseService) {}

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

  submitProductForm() {
    if (!this.productFormData.name || this.productFormData.price === null) {
      alert('🚨 申請退回：請至少填寫「資產名稱」與「計價金額」喔！');
      return;
    }

    this.houseService.createProduct(this.productFormData).subscribe({
      next: (res: any) => {
        const newProductId = res?.product?.id || res?.product?.Id || res?.Product?.id || res?.Product?.Id;
        if (this.productPendingPhotos.length > 0 && newProductId) {
          let completedUploads = 0;
          this.productPendingPhotos.forEach(photo => {
            this.uploadAndBindProductPhoto(newProductId, photo.file, photo.isCover, () => {
              completedUploads++;
              if (completedUploads === this.productPendingPhotos.length) {
                alert('🎉 資產申請已送出！等待審核中。');
                this.resetForm();
                window.location.reload();
              }
            });
          });
        } else {
          alert('🎉 資產申請已成功送出！(未附照片)，等待審核中。');
          this.resetForm();
        }
      },
      error: () => alert('新增失敗，請檢查後端狀態！')
    });
  }

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
