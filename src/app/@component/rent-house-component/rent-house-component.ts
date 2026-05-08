import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// 👇 1. 通訊兵路徑更新 (對齊你左邊改好的新檔名)
import { HouseService } from '../../@service/house.service';

// 👇 2. 呼叫住在 @interface 的設計圖
import { CreateHouseDto } from '../../@interface/house';

@Component({
  selector: 'app-rent-house-component',
  imports: [FormsModule],                     // 移除不需要的 RouterOutlet
  templateUrl: './rent-house-component.html', // 🌟 指向新房間的 HTML
  styleUrl: './rent-house-component.scss'     // 🌟 指向新房間的 SCSS
})
export class RentHouseComponent implements OnInit {

  houses = signal<any[]>([]);

  // 👇 📍 步驟二：更新 formData 的預設值，加入新成員
  formData: CreateHouseDto = {
    accountId: 1,
    name: '測試豪華套房',
    address: '高雄市三民區',
    description: '採光超好，附機車位',
    rentPrice: 15000,
    // 🆕 新增的預設值寫在這裡：
    includeUtilities: false,
    includeWifi: false,
    includeManagememtFee: false,
    areaSize: null,
    leaseTerm: 12,
    floorInfo: '',
    houseType: '獨立套房',
    status: 1
  };

  isEditMode = false;
  editingId = 0;

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
      this.houseService.createHouse(this.formData).subscribe({
        next: (res) => {
          alert('🎉 新增成功！');
          this.loadHouses();
        },
        error: (err) => console.error('新增失敗', err)
      });
    }
  }

  deleteHouse(id: number) {
    if (confirm('🚨 確定要刪除這間房子嗎？')) {
      this.houseService.deleteHouse(id).subscribe({
        next: (res) => {
          alert('🗑️ 刪除成功！');
          this.loadHouses();
        },
        error: (err) => console.error('刪除失敗', err)
      });
    }
  }

  editHouse(house: any) {
    this.isEditMode = true;
    this.editingId = house.id;
    this.formData = { ...house };
  }

  // 👇 ⚠️ 這裡也要更新！因為取消編輯時，要把所有欄位清空！
  cancelEdit() {
    this.isEditMode = false;
    this.editingId = 0;
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
      status: 1
    };
  }
  // 暫存使用者選擇的照片檔案
  selectedFile: File | null = null;

  // 1️⃣ 當使用者點擊「選擇檔案」時會觸發這個函數
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // 2️⃣ 當使用者點擊「上傳並登記」時觸發的連環拳
  // 2️⃣ 當使用者點擊「上傳並登記」時觸發的連環拳
  uploadPhotoForHouse(houseId: number, fileInput: HTMLInputElement) {
    if (!this.selectedFile) {
      alert('⚠️ 請先選擇一張照片喔！');
      return;
    }

    // 🥊 第一式：呼叫上傳 API (把實體檔案傳到資料夾)
    this.houseService.uploadImage(this.selectedFile).subscribe({
      next: (uploadRes: any) => {

        // 拿到後端給的網址
        const recordData = { houseId: houseId, url: uploadRes.urls[0], description: '' };

        // 🥊 第二式：立刻拿著網址去登記造冊！ (⚠️ 確保整段函數裡，這個 API 只呼叫一次！)
        this.houseService.addImageRecord(recordData).subscribe({
          next: (recordRes: any) => {
            alert('🎉 完美連招！照片已成功上傳，並綁定到這間房子上了！');

            // 清空記憶體與畫面的檔案
            this.selectedFile = null;
            fileInput.value = '';

            // 重新撈取資料，讓新照片顯示出來
            this.loadHouses();
          },
          error: (err) => console.error('第二式(登記)失敗', err)
        });

      },
      error: (err) => console.error('第一式(上傳)失敗', err)
    });
  }



  setAsCover(imageId: number) {
    this.houseService.setCoverImage(imageId).subscribe({
      next: () => {
        alert('👑 首圖更換成功！');
        this.loadHouses(); // 重新撈資料，讓畫面更新
      },
      error: (err) => console.error('設定首圖失敗', err)
    });
  }
deleteImage(imageId: number) {
    if (confirm('🚨 確定要銷毀這張照片嗎？（實體檔案也會一併刪除喔！）')) {
      this.houseService.deleteImage(imageId).subscribe({
        next: () => {
          alert('🗑️ 照片刪除成功！證據已銷毀！');
          this.loadHouses(); // 重新撈取資料，畫面上的照片就會消失
        },
        error: (err) => console.error('刪除照片失敗', err)
      });
    }
  }
  protected readonly title = signal('rent-house-web');
  // 👇 3. 測試用的函數
  testSetCover() {
    const testId = 1; // 假設你要把 Id=1 的照片設為首圖 (請確保資料庫有這個Id)

    this.houseService.setCoverImage(testId).subscribe({
      next: (res) => {
        console.log('成功啦！：', res);
        alert('設定首圖成功！快看 F12 Console');
      },
      error: (err) => {
        console.error('失敗了：', err);
      }
    });
  }
}

