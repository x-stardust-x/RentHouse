import { Component, signal, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HouseService } from '../../@service/house.service';
import { CreateHouseDto } from '../../@interface/house';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rent-house-component',
  imports: [FormsModule],
  templateUrl: './rent-house-component.html',
  styleUrl: './rent-house-component.scss'
})
export class RentHouseComponent implements OnInit {

  houses = signal<any[]>([]);

  // 綁定表單資料 (DTO)
  formData: CreateHouseDto = {
    accountId: 1, // TODO: 改為動態取得帳號 ID
    districtId: undefined, // 先不指定，讓房東選擇
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
    status: 1,

    sleepTime: 23,
    wakeTime: 7,
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

  constructor(
    private houseService: HouseService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadHouses();
    this.fetchDistricts();
  }

  // 取得房屋列表
  loadHouses() {
    this.houseService.getHouses().subscribe({
      next: (data) => this.houses.set(data),
      error: (err) => console.error('取得列表失敗', err)
    });
  }
  allDistricts: any[] = [];
  cityList: string[] = [];
  filteredDistricts: any[] = [];
  selectedCity: string | null = null;
  fetchDistricts() {
    const apiUrl = 'https://localhost:7215/api/RentHouse/Districts'; // 請確認你的正確網址
    this.http.get<any[]>(apiUrl).subscribe(res => {
      this.allDistricts = res;
      // 利用 Set 的特性，把重複的縣市名稱剃除掉，整理出乾淨的縣市清單！
      this.cityList = [...new Set(this.allDistricts.map(d => d.cityName))];
      this.cdr.detectChanges();
    });
  }

  onCityChange() {

    this.filteredDistricts = this.allDistricts.filter(d => d.cityName === this.selectedCity);

    this.formData.districtId = undefined;
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
    if (this.isEditMode) {
      this.houseService.updateHouse(this.editingId, this.formData).subscribe({
        next: (res) => {
          alert('✏️ 修改成功！');
          this.cancelEdit();
          this.loadHouses();
        },
        error: (err) => console.error('修改失敗', err)
      });
    } else {
      // 新增模式：先建立房屋實體
      this.houseService.createHouse(this.formData).subscribe({
        next: (res: any) => {
          const newHouseId = res?.id || res?.HouseId || res?.houseId;

          if (this.pendingPhotos.length > 0 && newHouseId) {
            // 🌟 升級：紀錄上傳進度，等所有照片都傳完再通知成功！
            let completedUploads = 0;
            const totalPhotos = this.pendingPhotos.length;

            this.pendingPhotos.forEach(photo => {
              this.uploadAndBindPhoto(newHouseId, photo.file, photo.isCover, () => {
                completedUploads++;
                // 當上傳成功的數量等於總數量時，才顯示成功並重置
                if (completedUploads === totalPhotos) {
                  alert('🎉 房屋申請已送出！包含多張照片與首圖設定，等待管理員審核中。');
                  this.resetForm();
                  // 如果你是同一個頁面切換身份，可以呼叫 this.loadHouses()
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
        // 🌟 防呆：防止 C# 的大小寫陷阱
        const imageUrls = uploadRes.urls || uploadRes.Urls;
        const finalUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : '';

        if (!finalUrl) {
          console.error('後端沒有回傳照片網址！', uploadRes);
          onComplete(); // 失敗也讓進度往前走，以免畫面卡死
          return;
        }

        const recordData = {
          houseId: houseId,
          url: finalUrl,
          description: '',
          isCover: isCover
        };

        this.houseService.addImageRecord(recordData).subscribe({
          next: () => onComplete(), // 🌟 綁定成功，發出通知！
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
      status: 1,
      sleepTime: 23,
    wakeTime: 7,
    cleanLevel: 3,
    noiseTolerance: 3,
    pet: false,
    smoke: false,
    interests: ''
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

  // 取消編輯模式
  cancelEdit() {
    this.isEditMode = false;
    this.editingId = 0;
    this.resetForm();
  }
}
