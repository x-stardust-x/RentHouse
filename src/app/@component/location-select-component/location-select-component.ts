import { Component, EventEmitter, Output, signal, effect, inject, input } from '@angular/core';
import { LocationService } from '../../@service/location-service';
import { District } from '../../@interface/location';

@Component({
  selector: 'app-location-select',
  standalone: true,
  template: `
  <div class="row g-2">

    <div class="col">
      <select class="form-select"
              [value]="selectedCityName()"
              (change)="onCityChange($event)">

        <option value="">選擇縣市</option>
        @for (cityName of cities(); track cityName) {
          <option [value]="cityName">
            {{ cityName }}
          </option>
        }

      </select>
    </div>

    <div class="col">
      <select class="form-select"
              [value]="selectedDistrictId() || ''"
              (change)="onDistrictChange($event)"
              [disabled]="!filteredDistricts().length">

        <option value="">選擇區域</option>
        @for (d of filteredDistricts(); track d.districtId) {
          <option [value]="d.districtId">
            {{ d.districtName }}
          </option>
        }

      </select>
    </div>

  </div>
  `,
})
export class LocationSelectComponent {

  locationService = inject(LocationService);

  // 外部傳入的綁定 ID
  districtId = input<number | null>(null);
  @Output() districtSelected = new EventEmitter<District>();

  // 🌟 控制變數升級：縣市改成記「名字字串」，區域依舊記「數字主鍵」
  selectedCityName = signal<string>('');
  selectedDistrictId = signal<number | null>(null);

  // 🌟 本機快取控制：用來動態畫出選單的兩個內部 signal
  cities = signal<string[]>([]);
  filteredDistricts = signal<District[]>([]);

  constructor() {
    // 初始化時，只呼叫一次大撈取即可
    this.locationService.loadAllDistricts();

    // 1. 監聽全台灣資料是否撈完了，撈完了就自動把「不重複縣市清單」做出來
    effect(() => {
      const allData = this.locationService.allDistricts();
      if (allData.length > 0) {
        const uniqueCities = [...new Set(allData.map(item => item.cityName))];
        this.cities.set(uniqueCities);
      }
    });

    // 2. 核心魔法：監聽外部傳進來的 districtId（例如從房屋編輯、載入舊資料時）
    effect(() => {
      const id = this.districtId();
      const allData = this.locationService.allDistricts();

      if (!id || allData.length === 0) return;

      // 🔍 從全台灣資料中找到符合這個 districtId 的行政區物件
      const matchedDistrict = allData.find(x => x.districtId === id);
      if (!matchedDistrict) return;

      // 🎯 找到了！同步切換前端的狀態（免用舊的 setTimeout 囉！）
      this.selectedCityName.set(matchedDistrict.cityName);
      this.selectedDistrictId.set(id);

      // ⚙️ 在地過濾：把這個縣市底下所有的區倒進選單
      const list = allData.filter(x => x.cityName === matchedDistrict.cityName);
      this.filteredDistricts.set(list);
    });
  }

  // 🔄 當使用者手動切換縣市時
  onCityChange(event: Event) {
    const cityName = (event.target as HTMLSelectElement).value;

    this.selectedCityName.set(cityName);
    this.selectedDistrictId.set(null); // 防呆：縣市換了，行政區先清空

    if (cityName) {
      // 🌟 在地過濾：直接從記憶體裡篩選出該縣市的區
      const matched = this.locationService.allDistricts().filter(dist => dist.cityName === cityName);
      this.filteredDistricts.set(matched);
    } else {
      this.filteredDistricts.set([]);
    }
  }

  // 🔄 當使用者手動切換區域時
  onDistrictChange(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    this.selectedDistrictId.set(id);

    // 從目前過濾出來的清單裡找到這個物件，發射給父元件
    const district = this.filteredDistricts().find(x => x.districtId === id);
    if (district) {
      this.districtSelected.emit(district);
    }
  }
}
