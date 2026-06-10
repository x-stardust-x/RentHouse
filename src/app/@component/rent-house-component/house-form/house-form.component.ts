import { Component, signal, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // 🌟 1. 引入網址掃描器
import { HouseService } from '../../../@service/house.service';
import { CreateHouseDto } from '../../../@interface/house';
import { District } from '../../../@interface/location';
import { LocationSelectComponent } from '../../location-select-component/location-select-component';
import { Authservice } from '../../../@service/authservice';
import { HouseViewingService } from '../../../@service/house-viewing-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


interface ViewingSlotForm {
  // availableDate: string;
  startTime: string;
  endTime: string;
  isEnabled: boolean;
}


@Component({
  selector: 'app-house-form',
  standalone: true,
  imports: [FormsModule, LocationSelectComponent],
  templateUrl: './house-form.component.html',
  styleUrl: './house-form.component.scss'
})
export class HouseFormComponent implements OnInit {
  private readonly authsev = inject(Authservice);
  private viewingService = inject(HouseViewingService);

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
    private router: Router
  ) { }

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
        this.loadViewingSlotsForEdit(id);
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

      this.router.navigate(['/login']);
      return;
    }

    if (this.formData.sleepTime?.length === 5) {
      this.formData.sleepTime += ':00';
    }

    if (this.formData.wakeTime?.length === 5) {
      this.formData.wakeTime += ':00';
    }

    console.log('送出表單', this.formData, '待上傳照片數量:', this.pendingPhotos.length);

    if (this.isEditMode) {
      this.houseService.updateHouse(this.editingId, this.formData).subscribe({
        next: () => {
          this.saveViewingSlotsForHouse(this.editingId, () => {
            this.uploadPendingPhotosIfNeeded(
              this.editingId,
              () => {
                Swal.fire({
                  title: '修改成功！',
                  text: this.pendingPhotos.length > 0
                    ? '您的房源資料、可看房時段與新圖片已成功更新。'
                    : '您的房源資料與可看房時段已成功更新。',
                  icon: 'success',
                  confirmButtonText: '回到列表',
                  confirmButtonColor: '#3085d6'
                }).then((result: any) => {
                  if (result.isConfirmed) {
                    this.resetForm();
                    this.router.navigate(['/user-center/houses']);
                  }
                });
              }
            );
          });
        },
        error: (err) => {
          console.error('修改失敗', err);
          Swal.fire('錯誤', '房源修改失敗，請檢查後端狀態！', 'error');
        }
      });

      return;
    }

    this.houseService.createHouse(this.formData).subscribe({
      next: (res: any) => {
        const newHouseId = res?.id || res?.HouseId || res?.houseId;

        if (!newHouseId) {
          Swal.fire('錯誤', '房屋已建立，但無法取得房屋 ID，請檢查後端回傳格式。', 'error');
          return;
        }

        this.saveViewingSlotsForHouse(newHouseId, () => {
          this.uploadPendingPhotosIfNeeded(
            newHouseId,
            () => {
              Swal.fire({
                title: '申請已送出！',
                text: this.pendingPhotos.length > 0
                  ? '房屋申請、可看房時段與圖片已儲存，等待管理員審核中。'
                  : '房屋申請與可看房時段已儲存，等待管理員審核中。',
                icon: 'success',
                confirmButtonText: '回到列表',
                confirmButtonColor: '#28a745'
              }).then((result: any) => {
                if (result.isConfirmed) {
                  this.resetForm();
                  this.router.navigate(['/user-center/houses']);
                }
              });
            }
          );
        });
      },
      error: (err) => {
        console.error('新增房屋申請失敗', err);
        Swal.fire('錯誤', '房屋申請失敗，請檢查後端狀態！', 'error');
      }
    });
  }

  private uploadPendingPhotosIfNeeded(houseId: number, onComplete: () => void): void {
    if (this.pendingPhotos.length === 0) {
      onComplete();
      return;
    }

    let completedUploads = 0;

    this.pendingPhotos.forEach(photo => {
      this.uploadAndBindPhoto(houseId, photo.file, photo.isCover, () => {
        completedUploads++;

        if (completedUploads === this.pendingPhotos.length) {
          onComplete();
        }
      });
    });
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


  viewingSlots = signal<ViewingSlotForm[]>([
    {
      // availableDate: '',
      startTime: '09:00',
      endTime: '12:00',
      isEnabled: true
    }
  ]);


  addViewingSlot() {
    this.viewingSlots.update(slots => [
      ...slots,
      {
        // availableDate: '',
        startTime: '14:00',
        endTime: '18:00',
        isEnabled: true
      }
    ]);
  }

  removeViewingSlot(index: number) {
    this.viewingSlots.update(slots => slots.filter((_, i) => i !== index));
  }

  private loadViewingSlotsForEdit(houseId: number) {
    this.viewingService.getAvailableSlotsByHouse(houseId).subscribe({
      next: (slots) => {
        if (!slots || slots.length === 0) {
          this.viewingSlots.set([
            {
              // availableDate: '',
              startTime: '09:00',
              endTime: '12:00',
              isEnabled: true
            }
          ]);
          return;
        }

        this.viewingSlots.set(slots.map(slot => ({
          // availableDate: slot.availableDate,
          startTime: slot.startTime,
          endTime: slot.endTime,
          isEnabled: true
        })));
      },
      error: (err) => {
        console.error('取得房源可看房時段失敗', err);
      }
    });
  }

  private saveViewingSlotsForHouse(houseId: number, onComplete: () => void) {
    const validSlots = this.viewingSlots()
      .filter(slot => slot.startTime && slot.endTime)
      .map(slot => ({
        startTime: slot.startTime,
        endTime: slot.endTime,
        isEnabled: slot.isEnabled
      }));

    console.log('準備儲存可看房時段：', {
      houseId,
      validSlots
    });

    this.viewingService.replaceAvailableSlotsByHouse(houseId, validSlots).subscribe({
      next: (res) => {
        console.log('可看房時段已儲存：', res);
        onComplete();
      },
      error: (err) => {
        console.error('儲存可看房時段失敗：', err);

        const backendMessage =
          err.error?.details ||
          err.error?.message ||
          err.message ||
          '未知錯誤';

        alert(`房屋資料已儲存，但可看房時段儲存失敗：${backendMessage}`);

        // 即使時段儲存失敗，也讓流程結束，不要卡在畫面
        onComplete();
      }
    });
  }
}
