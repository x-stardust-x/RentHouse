import { Component, inject, signal } from '@angular/core';
import { LocationSelectComponent } from "../../location-select-component/location-select-component";
import { LocationService } from '../../../@service/location-service';
import { Authservice } from '../../../@service/authservice';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../@service/user-service';
import { effect } from 'vue';

@Component({
  selector: 'app-member-edit-component',
  imports: [LocationSelectComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './member-edit-component.html',
  styleUrl: './member-edit-component.scss',
})
export class MemberEditComponent {
  private readonly locsev = inject(LocationService);
  private readonly authsev = inject(Authservice);
  userid! : number;
  onDistrictSelected(district: any) {
    console.log('選到區域:', district);
    console.log('郵遞區號:', district.zipCode);
  }
  userLocation = signal<any>(null);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userid = Number(this.authsev.getUserId());
    this.loadUserLocation(this.userid);
  }
  loadUserLocation(userId: number) {
    this.locsev.getUserLocation(userId)
      .subscribe(res => {
        console.log(res);

        this.userLocation.set(res);
      });
  }




   private fb = inject(FormBuilder);

  usersev = inject(UserService);

  locationService = inject(LocationService);

  selectedCityId = signal<number | null>(null);

  form = this.fb.group({

    realName: ['', Validators.required],

    englishName: [''],

    phone: [''],

    address: [''],

    bio: [''],

    districtId: [0, Validators.required],

    sleepTime: [23],

    wakeTime: [7],

    cleanLevel: [3],

    noiseTolerance: [3],

    pet: [false],

    smoke: [false],

    interests: ['']
  });

  constructor() {

    this.locationService.loadCities();

    // 載入個人資料
    this.usersev.loadProfile(1);

    effect(() => {

      const p = this.usersev.profile();

      if (!p) return;

      // 回填 form
      this.form.patchValue({

        realName: p.realName,

        englishName: p.englishName,

        phone: p.phone,

        address: p.address,

        bio: p.bio,

        sleepTime: p.sleepTime,

        wakeTime: p.wakeTime,

        cleanLevel: p.cleanLevel,

        noiseTolerance: p.noiseTolerance,

        pet: p.pet,

        smoke: p.smoke,

        interests: p.interests
      });

      // 找 city
      const district = this.locationService
        .districts()
        .find(x => x.id === p.id);

      if (district) {

        this.selectedCityId.set(district.cityId);

        this.locationService.loadDistricts(district.cityId);

        this.form.patchValue({
          districtId: district.id
        });
      }
    });
  }

  onCityChange(event: Event) {

    const cityId = Number(
      (event.target as HTMLSelectElement).value
    );

    this.selectedCityId.set(cityId);

    this.locationService.loadDistricts(cityId);

    this.form.patchValue({
      districtId: 0
    });
  }

  submit() {

    if (this.form.invalid) return;

    this.usersev
      .updateProfile(1, this.form.getRawValue() as any)
      .subscribe(() => {

        alert('更新成功');
      });
  }








}
