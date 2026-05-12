import { Component, EventEmitter, Output, signal, effect, inject, Input } from '@angular/core';
import { LocationService } from '../../@service/location-service';
import { City,District } from '../../@interface/location';

@Component({
  selector: 'app-location-select',
  standalone: true,
  template: `
  <div class="row g-2">

    <!-- City -->
    <div class="col">
      <select class="form-select"
              [value]="selectedCityId()"
              (change)="onCityChange($event)">

        <option value="">選擇縣市</option>

        @for (c of locationService.cities(); track c.id) {
          <option [value]="c.id">
            {{ c.cityName }}
          </option>
        }

      </select>
    </div>

    <!-- District -->
    <div class="col">
      <select class="form-select"
              [value]="selectedDistrictId()"
              (change)="onDistrictChange($event)"
              [disabled]="!locationService.districts().length">

        <option value="">選擇區域</option>

        @for (d of locationService.districts(); track d.id) {
          <option [value]="d.id">
            {{ d.districtName }}
          </option>
        }

      </select>
    </div>

  </div>
  `
})
export class LocationSelectComponent {

  locationService = inject(LocationService);
  @Input() districtId: number | null = null;
  @Output() districtSelected = new EventEmitter<District>();

  selectedCityId = signal<number | null>(null);
  selectedDistrictId = signal<number | null>(null);

  constructor() {
    this.locationService.loadCities();
    this.locationService.loadAllDistricts();
    effect(() => {

      const id = this.districtId;

      if (!id) return;

      // 找 district
      const district = this.locationService.allDistricts()
        .find(x => x.id === id);

      if (!district) return;

      // 自動選 city
      this.selectedCityId.set(district.cityId);

      // 載入 district list
      this.locationService.loadDistricts(district.cityId);

      // 自動選 district
      this.selectedDistrictId.set(id);

    });

  }

  onCityChange(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);

    this.selectedCityId.set(id);
    this.selectedDistrictId.set(null);

    if (id) {
      this.locationService.loadDistricts(id);
    } else {
      this.locationService.clearDistricts();
    }
  }

  onDistrictChange(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);

    this.selectedDistrictId.set(id);

    const district = this.locationService.districts()
      .find(x => x.id === id);

    if (district) {
      this.districtSelected.emit(district);
    }
  }
}
