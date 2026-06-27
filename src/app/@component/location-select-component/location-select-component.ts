import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal, effect, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../@service/location-service';
import { District } from '../../@interface/location';

@Component({
  selector: 'app-location-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './location-select-component.scss',
  template: `
  <div class="row g-2">

    <div class="col">
      <select
        class="form-select custom-select"
        [ngModel]="selectedCityName()"
        (ngModelChange)="onCityChange($event)"
      >
        <option value="">選擇縣市</option>

        @for (cityName of cities(); track cityName) {
          <option [value]="cityName">
            {{ cityName }}
          </option>
        }
      </select>
    </div>

    <div class="col">
      <select
        class="form-select custom-select"
        [ngModel]="selectedDistrictId()"
        (ngModelChange)="onDistrictChange($event)"
        [disabled]="!filteredDistricts().length"
      >
        <option [ngValue]="null">選擇區域</option>

        @for (d of filteredDistricts(); track d.districtId) {
          <option [ngValue]="d.districtId">
            {{ d.districtName }}
          </option>
        }
      </select>
    </div>

  </div>
  `,
})
export class LocationSelectComponent {
  private readonly locationService = inject(LocationService);

  districtId = input<number | string | null>(null);

  @Output() districtSelected = new EventEmitter<District>();

  selectedCityName = signal<string>('');
  selectedDistrictId = signal<number | null>(null);

  cities = signal<string[]>([]);
  filteredDistricts = signal<District[]>([]);

  private lastAppliedDistrictId: number | null = null;

  constructor() {
    this.locationService.loadAllDistricts();

    effect(() => {
      const allData = this.locationService.allDistricts();

      if (!allData || allData.length === 0) {
        return;
      }

      const uniqueCities = Array.from(
        new Set(allData.map(item => item.cityName))
      );

      this.cities.set(uniqueCities);

      this.applyDistrictId(this.districtId());
    });

    effect(() => {
      this.applyDistrictId(this.districtId());
    });
  }

  private applyDistrictId(rawId: number | string | null): void {
    const id = Number(rawId);
    const allData = this.locationService.allDistricts();

    console.log('LocationSelect 收到 districtId：', rawId, '轉換後：', id);

    if (!id || id <= 0) {
      this.selectedCityName.set('');
      this.selectedDistrictId.set(null);
      this.filteredDistricts.set([]);
      this.lastAppliedDistrictId = null;
      return;
    }

    if (!allData || allData.length === 0) {
      return;
    }

    const matchedDistrict = allData.find(
      x => Number(x.districtId) === id
    );

    console.log('LocationSelect 找到的區域：', matchedDistrict);

    if (!matchedDistrict) {
      return;
    }

    const districtsInCity = allData.filter(
      x => x.cityName === matchedDistrict.cityName
    );

    this.selectedCityName.set(matchedDistrict.cityName);
    this.filteredDistricts.set(districtsInCity);
    this.selectedDistrictId.set(Number(matchedDistrict.districtId));

    if (this.lastAppliedDistrictId !== id) {
      this.lastAppliedDistrictId = id;
      this.districtSelected.emit(matchedDistrict);
    }
  }

  onCityChange(cityName: string): void {
    this.selectedCityName.set(cityName);
    this.selectedDistrictId.set(null);
    this.lastAppliedDistrictId = null;

    if (!cityName) {
      this.filteredDistricts.set([]);
      return;
    }

    const matchedDistricts = this.locationService.allDistricts().filter(
      dist => dist.cityName === cityName
    );

    this.filteredDistricts.set(matchedDistricts);
  }

  onDistrictChange(rawId: number | string | null): void {
    const id = Number(rawId);

    if (!id || id <= 0) {
      this.selectedDistrictId.set(null);
      return;
    }

    this.selectedDistrictId.set(id);
    this.lastAppliedDistrictId = id;

    const district = this.filteredDistricts().find(
      x => Number(x.districtId) === id
    );

    if (district) {
      this.districtSelected.emit(district);
    }
  }
}
