import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../../@service/user-service';
import { LocationService } from '../../../@service/location-service';
import { UserProfile } from '../../../@interface/user-profile';
import { LocationSelectComponent } from "../../location-select-component/location-select-component";
import { District } from '../../../@interface/location';
import { NewsService } from '../../../@service/news-service';
import { Authservice } from '../../../@service/authservice';
import { A11yModule } from "@angular/cdk/a11y";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-edit-component',
  imports: [CommonModule, ReactiveFormsModule, LocationSelectComponent, A11yModule,RouterLink],
  templateUrl: './member-edit-component.html',
  styleUrl: './member-edit-component.scss',
})
export class MemberEditComponent {
  private readonly fb = inject(FormBuilder);
  public readonly usersev = inject(UserService);
  public readonly authsev = inject(Authservice);
  public readonly locsev = inject(LocationService);
  public readonly newsService = inject(NewsService);
  userProfileForm!: FormGroup;
  userId = this.authsev.getUserId();
  imagePreview = signal<string>('');


  constructor() {
    // 🌟 1. 修正：拔掉已經陣亡的 loadCities()，改用一網打盡的大撈取
    this.locsev.loadAllDistricts();

    this.userProfileForm = this.fb.group({
      id: [0],

      realName: ['', Validators.required],
      englishName: [''],

      avatar: [''],

      phone: ['',[
        Validators.required,
        Validators.pattern(/^09\d{8}$/),
        Validators.pattern(/^\d+$/) // 台灣手機：09開頭 + 8碼
      ]],

      address: [''],

      bio: [''],

      rating: [0],
      reviewCount: [0],

      // 地點相關欄位已經與新資料表格式完全對齊
      districtId: [0, Validators.required],
      cityName: [''],
      districtName: [''],
      zipCode: [''],

      // 就寢與起床時間改用「空字串 ''」初始化
      // 這樣才能完美對接微軟最新的 TimeOnly ("00:00:00") 字串格式，防止 400 錯！
      sleepTime: [''],
      wakeTime: [''],

      cleanLevel: [1],
      noiseTolerance: [1],

      pet: [false],
      smoke: [false],

      interests: ['']
    });


    this.usersev.loadProfile(this.userId);

    effect(() => {

      const profile = this.usersev.profile();

      if (!profile) return;
      this.imagePreview.set(profile.avatar || '');
      this.userProfileForm.patchValue({
        id: profile.id,
        realName: profile.realName,
        englishName: profile.englishName,

        avatar: profile.avatar,

        phone: profile.phone,

        address: profile.address,

        bio: profile.bio,

        rating: profile.rating,
        reviewCount: profile.reviewCount,

        districtId: profile.districtId,


        sleepTime: profile.sleepTime,
        wakeTime: profile.wakeTime,

        cleanLevel: profile.cleanLevel,
        noiseTolerance: profile.noiseTolerance,

        pet: profile.pet,
        smoke: profile.smoke,

        interests: profile.interests
      });

    });
  }


  onDistrictSelected(d: District) {

    const cityName = d.cityName;

    this.userProfileForm.patchValue({
      districtId: d.districtId,
      cityName: cityName,
      districtName: d.districtName,
      zipCode: d.zipCode
    });
  }

  onSubmit() {
    if (this.userProfileForm.value.sleepTime?.length === 5) {
      this.userProfileForm.patchValue({
        sleepTime: this.userProfileForm.value.sleepTime + ':00'
      });
    }

    if (this.userProfileForm.value.wakeTime?.length === 5) {
      this.userProfileForm.patchValue({
        wakeTime: this.userProfileForm.value.wakeTime + ':00'
      });
    }
    var form: UserProfile = this.userProfileForm.getRawValue();

    this.usersev.updateProfile(form);
  }

  onFileChange(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    // 預覽
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview.set(reader.result as string);
    };

    reader.readAsDataURL(file);

    // 上傳圖片
    this.uploadImage(file);

  }
  uploadImage(file: File) {

    const formData = new FormData();

    formData.append('file', file);

    this.newsService.uploadImage(formData)
      .subscribe((res: any) => {
        // 存 URL 到 form
        this.userProfileForm.patchValue({
          avatar: res.url
        });

      });
  }
  onNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;

    input.value = input.value.replace(/\D/g, ''); // 去掉非數字

    this.userProfileForm.get('phone')?.setValue(input.value);
  }
}
