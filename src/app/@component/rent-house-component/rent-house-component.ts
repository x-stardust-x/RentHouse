import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { HouseService } from '../../@service/house.service';


import { CreateHouseDto } from '../../@interface/house';

@Component({
  selector: 'app-rent-house-component',
  imports: [FormsModule],                     
  templateUrl: './rent-house-component.html', 
  styleUrl: './rent-house-component.scss'     
})
export class RentHouseComponent implements OnInit {

  houses = signal<any[]>([]);

  
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
 
  selectedFile: File | null = null;

  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

 
  uploadPhotoForHouse(houseId: number, fileInput: HTMLInputElement) {
    if (!this.selectedFile) {
      alert('⚠️ 請先選擇一張照片喔！');
      return;
    }

    
    this.houseService.uploadImage(this.selectedFile).subscribe({
      next: (uploadRes: any) => {

        
        const recordData = { houseId: houseId, url: uploadRes.urls[0], description: '' };

        
        this.houseService.addImageRecord(recordData).subscribe({
          next: (recordRes: any) => {
            alert('🎉 完美連招！照片已成功上傳，並綁定到這間房子上了！');

            
            this.selectedFile = null;
            fileInput.value = '';

            
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
        this.loadHouses(); 
      },
      error: (err) => console.error('設定首圖失敗', err)
    });
  }
deleteImage(imageId: number) {
    if (confirm('🚨 確定要銷毀這張照片嗎？（實體檔案也會一併刪除喔！）')) {
      this.houseService.deleteImage(imageId).subscribe({
        next: () => {
          alert('🗑️ 照片刪除成功！證據已銷毀！');
          this.loadHouses(); 
        },
        error: (err) => console.error('刪除照片失敗', err)
      });
    }
  }
  protected readonly title = signal('rent-house-web');
  
  testSetCover() {
    const testId = 1; 
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

