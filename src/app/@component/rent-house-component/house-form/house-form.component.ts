import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HouseService } from '../../../@service/house.service'; // 🌟 修正路徑
import { CreateHouseDto } from '../../../@interface/house';
import { District } from '../../../@interface/location';
import { LocationSelectComponent } from '../../location-select-component/location-select-component';

@Component({
  selector: 'app-house-form',
  standalone: true,
  imports: [FormsModule, LocationSelectComponent],
  templateUrl: './house-form.component.html',
  styleUrl: './house-form.component.scss' // 房屋專屬 SCSS 剪到這
})
export class HouseFormComponent implements OnInit {
  houses = signal<any[]>([]);
  isEditMode = false;
  editingId = 0;
  pendingPhotos: { file: File, previewUrl: string, isCover: boolean }[] = [];

  formData: CreateHouseDto = {
    accountId: 1,
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

  constructor(private houseService: HouseService) {}

  ngOnInit() {
    this.loadHouses();
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
    if (this.formData.sleepTime?.length === 5) this.formData.sleepTime += ':00';
    if (this.formData.wakeTime?.length === 5) this.formData.wakeTime += ':00';

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
            this.pendingPhotos.forEach(photo => {
              this.uploadAndBindPhoto(newHouseId, photo.file, photo.isCover, () => {
                completedUploads++;
                if (completedUploads === this.pendingPhotos.length) {
                  alert('🎉 房屋申請已送出！等待審核中。');
                  this.resetForm();
                  window.location.reload();
                }
              });
            });
          } else {
            alert('🎉 房屋申請已送出！(未附照片)，等待審核中。');
            this.resetForm();
          }
        },
        error: (err) => console.error('新增房屋申請失敗', err)
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
      accountId: 1, districtId: undefined, name: '', address: '', description: '',
      rentPrice: 0, includeUtilities: false, includeWifi: false, includeManagememtFee: false,
      areaSize: null, leaseTerm: 12, floorInfo: '', houseType: '獨立套房', status: 0,
      sleepTime: '23:30', wakeTime: '07:00', cleanLevel: 3, noiseTolerance: 3, pet: false, smoke: false, interests: '',
      advancedRules: ''
    };
    this.pendingPhotos = [];
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
