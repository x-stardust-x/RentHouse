import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HouseService } from '../../@service/house.service';
import { CreateHouseDto } from '../../@interface/house';
import { District } from '../../@interface/location'; // 🌟 引入新規格
// ✅ 這是精準無誤的通關路徑！
import { LocationSelectComponent } from '../location-select-component/location-select-component';

@Component({
  selector: 'app-rent-house-component',
  standalone: true, // 🌟 確保是獨立元件
  imports: [FormsModule, LocationSelectComponent], // 🌟 把新做的地點元件放進來！
  templateUrl: './rent-house-component.html',
  styleUrl: './rent-house-component.scss'
})
export class RentHouseComponent implements OnInit {

  houses = signal<any[]>([]);

  // 綁定表單資料 (DTO)
  formData: CreateHouseDto = {
    accountId: 1, // TODO: 改為動態取得帳號 ID
    districtId: undefined, // 🌟 房東選好區域後，會被寫入這裡！
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

    // 🌟 時間字串初始化保持乾淨
    sleepTime: '23:30',
    wakeTime: '07:00',
    cleanLevel: 3,
    noiseTolerance: 3,
    pet: false,
    smoke: false,
    interests: ''
  };

  isEditMode = false;
  editingId = 0;

  // 暫存選擇的照片 (實體檔案、預覽網址、是否為首圖)
  pendingPhotos: { file: File, previewUrl: string, isCover: boolean }[] = [];

  protected readonly title = signal('rent-house-web');

  // 🌟 瘦身成功：完全不需要 HttpClient 和 ChangeDetectorRef 囉！
  constructor(private houseService: HouseService) {}

  ngOnInit() {
    this.loadHouses();
  }

  // 取得房屋列表
  loadHouses() {
    this.houseService.getHouses().subscribe({
      next: (data) => this.houses.set(data),
      error: (err) => console.error('取得列表失敗', err)
    });
  }

  // 🌟 核心升級：當房東在下拉選單選好區域時，直接把 districtId 塞進表單物件！
  onDistrictSelected(district: District) {
    this.formData.districtId = district.districtId;
    console.log('🕵️‍♂️ 偵探回報：房東已選定區域，目前 districtId 鎖定為：', district.districtId);
  }

  // 處理多圖選取與預覽
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
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // 設定首圖
  setPendingCover(selectedIndex: number) {
    this.pendingPhotos.forEach((photo, index) => {
      photo.isCover = (index === selectedIndex);
    });
  }

  // 提交表單 (新增/修改)
  submitForm() {
    // 時間補秒數邏輯
    if (this.formData.sleepTime) {
      if (this.formData.sleepTime.length === 5) this.formData.sleepTime += ':00';
    } else {
      this.formData.sleepTime = '23:30:00';
    }

    if (this.formData.wakeTime) {
      if (this.formData.wakeTime.length === 5) this.formData.wakeTime += ':00';
    } else {
      this.formData.wakeTime = '07:00:00';
    }

    console.log('🕵️‍♂️ 偵探回報：即將送出的 formData 包裹內容為：', this.formData);

    if (this.isEditMode) {
      this.houseService.updateHouse(this.editingId, this.formData).subscribe({
        next: () => {
          alert('✏️ 修改成功！');
          this.cancelEdit();
          this.loadHouses();
        },
        error: (err) => console.error('修改失敗', err)
      });
    } else {
      this.houseService.createHouse(this.formData).subscribe({
        next: (res: any) => {
          const newHouseId = res?.id || res?.HouseId || res?.houseId;

          if (this.pendingPhotos.length > 0 && newHouseId) {
            let completedUploads = 0;
            const totalPhotos = this.pendingPhotos.length;

            this.pendingPhotos.forEach(photo => {
              this.uploadAndBindPhoto(newHouseId, photo.file, photo.isCover, () => {
                completedUploads++;
                if (completedUploads === totalPhotos) {
                  alert('🎉 房屋申請已送出！包含多張照片與首圖設定，等待管理員審核中。');
                  this.resetForm();
                  window.location.reload();
                }
              });
            });
          } else {
            alert('🎉 房屋申請已送出！(未附照片)，等待管理員審核中。');
            this.resetForm();
          }
        },
        error: (err) => console.error('新增房屋申請失敗', err)
      });
    }
  }

  // 處理單張照片上傳與資料庫綁定
  uploadAndBindPhoto(houseId: number, file: File, isCover: boolean, onComplete: () => void) {
    this.houseService.uploadImage(file).subscribe({
      next: (uploadRes: any) => {
        const imageUrls = uploadRes.urls || uploadRes.Urls;
        const finalUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : '';

        if (!finalUrl) {
          console.error('後端沒有回傳照片網址！', uploadRes);
          onComplete();
          return;
        }

        const recordData = {
          houseId: houseId,
          url: finalUrl,
          description: '',
          isCover: isCover
        };

        this.houseService.addImageRecord(recordData).subscribe({
          next: () => onComplete(),
          error: (err) => {
            console.error('照片資料庫綁定失敗', err);
            onComplete();
          }
        });
      },
      error: (err) => {
        console.error('照片實體檔上傳失敗', err);
        onComplete();
      }
    });
  }

  // 清空表單與暫存照片
  resetForm() {
    this.formData = {
      accountId: 1,
      districtId: undefined, // 🌟 重設為未選取狀態
      name: '',
      address: '',
      description: '',
      rentPrice: 0,
      includeUtilities: false,
      includeWifi: false,
      includeManagememtFee: false,
      areaSize: null,
      leaseTerm: 12,
      floorInfo: '',
      houseType: '獨立套房',

      // 🌟 終極修正：無論如何重設，剛生出來的房子一律鎖死在 0 (待審核)！
      status: 0,

      sleepTime: '23:30',
      wakeTime: '07:00',
      cleanLevel: 3,
      noiseTolerance: 3,
      pet: false,
      smoke: false,
      interests: ''
    };
    this.pendingPhotos = [];
    console.log('🕵️‍♂️ 偵探回報：表單已徹底清空，狀態已重置為 0 (待審核)');
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
