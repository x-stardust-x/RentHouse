import { Component, signal, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // 🌟 1. 引入網址掃描器
import { HouseService } from '../../../@service/house.service';
import { CreateHouseDto } from '../../../@interface/house';
import { District } from '../../../@interface/location';
import { LocationSelectComponent } from '../../location-select-component/location-select-component';
import { Authservice } from '../../../@service/authservice';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-house-form',
  standalone: true,
  imports: [FormsModule, LocationSelectComponent],
  templateUrl: './house-form.component.html',
  styleUrl: './house-form.component.scss'
})
export class HouseFormComponent implements OnInit {
  private readonly authsev = inject(Authservice);

  houses = signal<any[]>([]);
  isEditMode = false;
  editingId = 0;
  pendingPhotos: { file: File, previewUrl: string, isCover: boolean }[] = [];

  // 🌟 2. 新增：存放從資料庫撈回來的舊照片陣列
  existingPhotos: any[] = [];

  formData: CreateHouseDto = {
    accountId: this.authsev.getAccountId() ?? 0,
    districtId: undefined,
    name: '測試豪華套房',
    address: '',
    description: '採光超好，附機車位',
    rentPrice: 15000,
    includeUtilities: false,
    includeWifi: false,
    includeManagememtFee: false,
    areaSize: null,
    leaseTerm: 12,
    floorInfo: '',
    houseType: '獨立套房',
    status: 0,
    sleepTime: '23:30',
    wakeTime: '07:00',
    cleanLevel: 3,
    noiseTolerance: 3,
    pet: false,
    smoke: false,
    interests: '',
    advancedRules: ''
  };

  constructor(
    private houseService: HouseService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router // 🌟 3. 把網址掃描器注入進來
  ) {}

  ngOnInit() {

    this.loadHouses();

    // 🌟 4. 一進畫面就掃描網址，看看有沒有帶 editId 過來
    this.route.queryParams.subscribe(params => {
      if (params['editId']) {
        this.isEditMode = true; // 開啟編輯模式
        this.editingId = Number(params['editId']); // 記下要編輯的 ID
        this.loadHouseDataForEdit(this.editingId); // 啟動自動填表機！
      }
    });
  }

  // 🌟 5. 專門用來抓舊資料，並塞進表單的函式
  loadHouseDataForEdit(id: number) {
    this.houseService.getHouseById(id).subscribe({
      next: (data: any) => {
        console.log('準備編輯的房屋資料：', data);

        // 把後端傳回來的資料，一個一個塞回 formData 裡面
        this.formData = {
          accountId: data.accountId || 1,
          districtId: data.districtId,
          name: data.name || '',
          address: data.address || '',
          description: data.description || '',
          rentPrice: data.rentPrice || 0,
          includeUtilities: data.includeUtilities || false,
          includeWifi: data.includeWifi || false,
          includeManagememtFee: data.includeManagementFee || false,
          areaSize: data.areaSize || null,
          leaseTerm: data.leaseTerm || 12,
          floorInfo: data.floorInfo || '',
          houseType: data.houseType || '獨立套房',
          status: data.status || 0,

          sleepTime: data.sleepTime ? data.sleepTime.substring(0, 5) : '23:30',
          wakeTime: data.wakeTime ? data.wakeTime.substring(0, 5) : '07:00',
          cleanLevel: data.cleanLevel || 3,
          noiseTolerance: data.noiseTolerance || 3,
          pet: data.pet || false,
          smoke: data.smoke || false,
          interests: data.interests || '',
          advancedRules: data.advancedRules || ''
        };

        // 🌟 6. 新增：捕捉這間房子的舊照片 (相容後端回傳格式，可能是 images 或 houseImages)
        this.existingPhotos = data.images || data.houseImages || [];

        this.cdr.detectChanges(); // 提醒畫面更新
      },
      error: (err) => console.error('撈取編輯資料失敗', err)
    });
  }

  // 🌟 7. 新增：點擊叉叉刪除資料庫舊照片的功能
  deleteExistingPhoto(photoId: number, index: number) {
    if (confirm('確定要刪除這張照片嗎？這將直接從伺服器移除喔！')) {
      // 呼叫 Service 刪除照片紀錄 (請確保 houseService 裡面有 deleteImageRecord 或是對應的方法名)
      this.houseService.deleteImageRecord(photoId).subscribe({
        next: () => {
          this.existingPhotos.splice(index, 1); // 從畫面上移除該照片
          this.cdr.detectChanges();
          alert('🗑️ 照片已成功刪除！');
        },
        error: (err) => {
          console.error('刪除照片失敗', err);
          alert('刪除照片失敗，請稍後再試');
        }
      });
    }
  }

  loadHouses() {
    this.houseService.getHouses().subscribe({
      next: (data) => this.houses.set(data),
      error: (err) => console.error('取得列表失敗', err)
    });
  }

  onDistrictSelected(district: District) {
    this.formData.districtId = district.districtId;
  }

  onFilesSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.pendingPhotos.push({
            file: file,
            previewUrl: e.target.result,
            isCover: this.pendingPhotos.length === 0
          });
          this.cdr.detectChanges();
        };
        reader.readAsDataURL(file);
      }
    }
  }

  setPendingCover(selectedIndex: number) {
    this.pendingPhotos.forEach((photo, index) => {
      photo.isCover = (index === selectedIndex);
    });
  }

  submitForm() {

    if (this.formData.accountId === 0) {
      Swal.fire({
        title: '尚未登入',
        text: '您尚未登入或登入已過期，請先登入後再發布房屋！',
        icon: 'warning',
        confirmButtonText: '我知道了',
        confirmButtonColor: '#f39c12'
      });
       this.router.navigate(['/login']); // 實務上可以踢回登入頁
      return;
    }

    if (this.formData.sleepTime?.length === 5) this.formData.sleepTime += ':00';
    if (this.formData.wakeTime?.length === 5) this.formData.wakeTime += ':00';
    console.log('送出表單', this.formData, '待上傳照片數量:', this.pendingPhotos.length);

    if (this.isEditMode) {

      this.houseService.updateHouse(this.editingId, this.formData).subscribe({
        next: () => {
          // 檢查有沒有選擇「新」照片要上傳
          if (this.pendingPhotos.length > 0) {
            let completedUploads = 0;
            this.pendingPhotos.forEach(photo => {
              this.uploadAndBindPhoto(this.editingId, photo.file, photo.isCover, () => {
                completedUploads++;
                if (completedUploads === this.pendingPhotos.length) {
                  // 🌟 編輯成功 (含照片)
                  Swal.fire({
                    title: '修改成功！',
                    text: '您的房源資料與新圖片已成功更新。',
                    icon: 'success',
                    confirmButtonText: '回到列表',
                    confirmButtonColor: '#3085d6'
                  }).then((result) => {
                    if (result.isConfirmed) this.router.navigate(['/user-center/houses']);
                  });
                }
              });
            });
          } else {
            // 🌟 編輯成功 (無新照片)
            Swal.fire({
              title: '修改成功！',
              text: '您的房源資料已成功更新。',
              icon: 'success',
              confirmButtonText: '回到列表',
              confirmButtonColor: '#3085d6'
            }).then((result) => {
              if (result.isConfirmed) this.router.navigate(['/user-center/houses']);
            });
          }
        },
        error: (err) => {
          console.error('修改失敗', err);
          Swal.fire('錯誤', '房源修改失敗，請檢查後端狀態！', 'error');
        }
      });
    } else {

      this.houseService.createHouse(this.formData).subscribe({
        next: (res: any) => {
          const newHouseId = res?.id || res?.HouseId || res?.houseId;
          if (this.pendingPhotos.length > 0 && newHouseId) {
            let completedUploads = 0;
            this.pendingPhotos.forEach(photo => {
              this.uploadAndBindPhoto(newHouseId, photo.file, photo.isCover, () => {
                completedUploads++;
                if (completedUploads === this.pendingPhotos.length) {
                  // 🌟 新增成功 (含照片)
                  Swal.fire({
                    title: '申請已送出！',
                    text: '房屋申請已送出，等待管理員審核中。',
                    icon: 'success',
                    confirmButtonText: '回到列表',
                    confirmButtonColor: '#28a745'
                  }).then((result) => {
                    if (result.isConfirmed) this.router.navigate(['/user-center/houses']);
                  });
                }
              });
            });
          } else {
            // 🌟 新增成功 (未附照片)
            Swal.fire({
              title: '申請已送出！',
              text: '房屋申請已送出 (未附照片)，等待管理員審核中。',
              icon: 'success',
              confirmButtonText: '回到列表',
              confirmButtonColor: '#28a745'
            }).then((result) => {
              if (result.isConfirmed) this.router.navigate(['/user-center/houses']);
            });
          }
        },
        error: (err) => {
          console.error('新增房屋申請失敗', err);
          Swal.fire('錯誤', '房屋申請失敗，請檢查後端狀態！', 'error');
        }
      });
    }
  }
  uploadAndBindPhoto(houseId: number, file: File, isCover: boolean, onComplete: () => void) {
    this.houseService.uploadImage(file).subscribe({
      next: (uploadRes: any) => {
        const imageUrls = uploadRes.urls || uploadRes.Urls;
        const finalUrl = imageUrls?.[0] || '';
        if (!finalUrl) { onComplete(); return; }

        const recordData = { houseId, url: finalUrl, description: '', isCover };
        this.houseService.addImageRecord(recordData).subscribe({
          next: () => onComplete(),
          error: () => onComplete()
        });
      },
      error: () => onComplete()
    });
  }

  resetForm() {
    this.formData = {
      accountId: this.authsev.getAccountId() ?? 1, districtId: undefined, name: '', address: '', description: '',
      rentPrice: 0, includeUtilities: false, includeWifi: false, includeManagememtFee: false,
      areaSize: null, leaseTerm: 12, floorInfo: '', houseType: '獨立套房', status: 0,
      sleepTime: '23:30', wakeTime: '07:00', cleanLevel: 3, noiseTolerance: 3, pet: false, smoke: false, interests: '',
      advancedRules: ''
    };
    this.pendingPhotos = [];
    this.existingPhotos = []; // 🌟 新增：重設表單時，一併清空舊照片紀錄
  }

  removePendingPhoto(index: number) {
    const isDeletingCover = this.pendingPhotos[index].isCover;
    this.pendingPhotos.splice(index, 1);
    if (isDeletingCover && this.pendingPhotos.length > 0) {
      this.pendingPhotos.forEach(p => p.isCover = false);
      this.pendingPhotos[0].isCover = true;
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editingId = 0;
    this.resetForm();
  }
}
