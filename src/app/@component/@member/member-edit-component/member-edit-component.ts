import { Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../../@service/alert-service';
import { ImageCropperComponent } from 'ngx-image-cropper';


@Component({
  selector: 'app-member-edit-component',
  imports: [CommonModule, ReactiveFormsModule, LocationSelectComponent, A11yModule, RouterLink, ImageCropperComponent],
  templateUrl: './member-edit-component.html',
  styleUrl: './member-edit-component.scss',
})
export class MemberEditComponent {
  private readonly fb = inject(FormBuilder);
  public readonly usersev = inject(UserService);
  public readonly authsev = inject(Authservice);
  public readonly locsev = inject(LocationService);
  public readonly newsService = inject(NewsService);
  private router = inject(Router);
  private alert = inject(AlertService);

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  isSubmitting = signal(false);
  userProfileForm!: FormGroup;
  userId = this.authsev.getUserId();
  imagePreview = signal<string>('');
  selectedDistrictId = signal<number | null>(null);
  interestTags = signal<string[]>([]);
  customInterestInput = signal<string>('');
  isOpen = false;
  isUploading = signal(false);
  croppedImage = '';
  imageChangedEvent: Event | null = null;
  readonly presetInterestTags = [
    '閱讀',
    '電影',
    '健身',
    '料理',
    '園藝',
    '手作',
    '音樂',
    '桌遊',
    '寵物',
    '登山',
    '攝影',
    '電玩'
  ];

  readonly cleanLevelOptions = [
    { value: 1, label: '1｜隨性自然', description: '不太介意生活感，能接受偶爾凌亂' },
    { value: 2, label: '2｜偶爾整理', description: '偶爾整理，保持基本乾淨即可' },
    { value: 3, label: '3｜一般乾淨', description: '希望公共空間維持一般整潔' },
    { value: 4, label: '4｜注重整潔', description: '重視整潔，會定期整理環境' },
    { value: 5, label: '5｜非常重視整潔', description: '對整潔要求高，希望環境乾淨有秩序' }
  ];

  readonly noiseToleranceOptions = [
    { value: 1, label: '1｜非常怕吵', description: '需要安靜環境，對聲音較敏感' },
    { value: 2, label: '2｜喜歡安靜', description: '偏好安靜，能接受少量生活聲音' },
    { value: 3, label: '3｜一般音量可接受', description: '可接受一般日常音量' },
    { value: 4, label: '4｜可接受偶爾吵雜', description: '能接受偶爾聊天、電視或生活聲' },
    { value: 5, label: '5｜可接受熱鬧環境', description: '不太怕吵，可接受較熱鬧的共居環境' }
  ];


  constructor() {
    // 🌟 1. 修正：拔掉已經陣亡的 loadCities()，改用一網打盡的大撈取
    this.locsev.loadAllDistricts();

    this.userProfileForm = this.fb.group({
      id: [0],

      realName: ['', Validators.required],
      englishName: [''],

      avatar: [''],

      phone: ['', [
        Validators.required,
        Validators.pattern(/^09\d{8}$/),
        Validators.pattern(/^\d+$/) // 台灣手機：09開頭 + 8碼
      ]],
      lineId: [''],

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
      const allDistricts = this.locsev.allDistricts();

      if (!profile) return;

      const matchedDistrict = this.resolveProfileDistrict(profile, allDistricts);

      const districtId = matchedDistrict
        ? Number(matchedDistrict.districtId)
        : Number(
          profile.districtId ??
          (profile as any).DistrictId ??
          (profile as any).districtID ??
          0
        );

      this.imagePreview.set(profile.avatar || '');

      this.userProfileForm.patchValue({
        id: profile.id,
        realName: profile.realName,
        englishName: profile.englishName,

        avatar: profile.avatar,

        phone: profile.phone,
        lineId: profile.lineId ?? '',

        address: profile.address,

        bio: profile.bio,

        rating: profile.rating,
        reviewCount: profile.reviewCount,

        districtId: districtId,
        cityName: matchedDistrict?.cityName ?? profile.cityName ?? '',
        districtName: matchedDistrict?.districtName ?? profile.districtName ?? '',
        zipCode: matchedDistrict?.zipCode ?? profile.zipCode ?? '',

        sleepTime: profile.sleepTime,
        wakeTime: profile.wakeTime,

        cleanLevel: profile.cleanLevel,
        noiseTolerance: profile.noiseTolerance,

        pet: profile.pet,
        smoke: profile.smoke,

        interests: profile.interests
      });

      this.interestTags.set(this.parseInterestText(profile.interests ?? ''));

      this.selectedDistrictId.set(districtId > 0 ? districtId : null);
    });
  }

  private resolveProfileDistrict(profile: UserProfile, allDistricts: District[]): District | null {
    if (!allDistricts || allDistricts.length === 0) {
      return null;
    }

    const rawDistrictId = Number(
      profile.districtId ??
      (profile as any).DistrictId ??
      (profile as any).districtID ??
      0
    );

    if (rawDistrictId > 0) {
      const byId = allDistricts.find(
        d => Number(d.districtId) === rawDistrictId
      );

      if (byId) return byId;
    }

    const cityName =
      profile.cityName ??
      (profile as any).CityName ??
      '';

    const districtName =
      profile.districtName ??
      (profile as any).DistrictName ??
      '';

    if (cityName && districtName) {
      const byName = allDistricts.find(
        d => d.cityName === cityName && d.districtName === districtName
      );

      if (byName) return byName;
    }

    const address = profile.address ?? '';

    if (address) {
      const byAddress = allDistricts.find(
        d =>
          address.includes(d.cityName) &&
          address.includes(d.districtName)
      );

      if (byAddress) return byAddress;
    }

    return null;
  }

  onDistrictSelected(d: District) {
    this.selectedDistrictId.set(Number(d.districtId));

    this.userProfileForm.patchValue({
      districtId: Number(d.districtId),
      cityName: d.cityName,
      districtName: d.districtName,
      zipCode: d.zipCode
    });
  }

  private parseInterestText(value: string): string[] {
    if (!value) return [];

    return value
      .split(/[,，、\n]/)
      .map(x => x.trim())
      .filter(x => x.length > 0)
      .filter((x, index, array) => array.indexOf(x) === index);
  }

  private syncInterestsToForm(): void {
    this.userProfileForm.patchValue({
      interests: this.interestTags().join(',')
    });
  }

  isInterestSelected(tag: string): boolean {
    return this.interestTags().includes(tag);
  }

  togglePresetInterest(tag: string): void {
    if (this.isInterestSelected(tag)) {
      this.removeInterestTag(tag);
      return;
    }

    this.interestTags.update(current => [...current, tag]);
    this.syncInterestsToForm();
  }

  addCustomInterest(): void {
    const rawValue = this.customInterestInput().trim();

    if (!rawValue) return;

    const newTags = this.parseInterestText(rawValue);

    if (newTags.length === 0) return;

    this.interestTags.update(current => {
      const merged = [...current];

      newTags.forEach(tag => {
        if (!merged.includes(tag)) {
          merged.push(tag);
        }
      });

      return merged;
    });

    this.customInterestInput.set('');
    this.syncInterestsToForm();
  }

  removeInterestTag(tag: string): void {
    this.interestTags.update(current => current.filter(x => x !== tag));
    this.syncInterestsToForm();
  }

  getCleanLevelDescription(): string {
    const value = Number(this.userProfileForm.get('cleanLevel')?.value);

    return this.cleanLevelOptions.find(option => option.value === value)?.description
      || '希望公共空間維持一般整潔';
  }

  getNoiseToleranceDescription(): string {
    const value = Number(this.userProfileForm.get('noiseTolerance')?.value);

    return this.noiseToleranceOptions.find(option => option.value === value)?.description
      || '可接受一般日常音量';
  }

  onSubmit() {
    this.syncInterestsToForm();

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
    this.userProfileForm.patchValue({
      cleanLevel: Number(this.userProfileForm.value.cleanLevel),
      noiseTolerance: Number(this.userProfileForm.value.noiseTolerance)
    });

    var form: UserProfile = this.userProfileForm.getRawValue();


    this.isSubmitting.set(true);

    this.usersev.updateProfile(form).subscribe({
      next: (res) => {
        this.alert.successTime("更改成功");
        this.router.navigate(['/user-center']);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.alert.error("更改失敗", err.error?.message || "請查看有無填漏");
      }
    });
  }

  onFileChange(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.imageChangedEvent = event;

    this.isOpen = true;

  }
  imageCropped(event: any) {

    this.croppedImage =
      event.objectUrl ||
      event.base64 ||
      '';

  }
  async confirmCrop() {

    if (!this.croppedImage || this.isUploading()) {
      return;
    }
    this.imagePreview.set(this.croppedImage);
    this.isUploading.set(true);

    try {

      const response = await fetch(this.croppedImage);
      const blob = await response.blob();

      const file = new File(
        [blob],
        'avatar.png',
        { type: blob.type || 'image/png' }
      );

      this.uploadImage(file);

    } finally {

      // uploadImage 完成後再關掉
    }

  }
  uploadImage(file: File) {

    const formData = new FormData();

    formData.append('file', file);

    this.newsService.uploadImage(formData)
      .subscribe({

        next: (res: any) => {

          this.userProfileForm.patchValue({
            avatar: res.url
          });

          this.imagePreview.set(res.url);

          this.closeModal();

          this.isUploading.set(false);

        },

        error: () => {

          this.isUploading.set(false);

        }

      });

  }

  onNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;

    input.value = input.value.replace(/\D/g, ''); // 去掉非數字

    this.userProfileForm.get('phone')?.setValue(input.value);
  }

  cleanLevelLabel(value: number | string | null | undefined): string {
    const level = Number(value);

    const labels: Record<number, string> = {
      1: '隨性自然',
      2: '偶爾整理',
      3: '一般乾淨',
      4: '注重整潔',
      5: '非常重視整潔'
    };

    return labels[level] || '一般乾淨';
  }

  noiseToleranceLabel(value: number | string | null | undefined): string {
    const level = Number(value);

    const labels: Record<number, string> = {
      1: '非常怕吵',
      2: '喜歡安靜',
      3: '一般音量可接受',
      4: '可接受偶爾吵雜',
      5: '可接受熱鬧環境'
    };

    return labels[level] || '一般音量可接受';
  }
  closeModal() {

    this.isOpen = false;

    this.imageChangedEvent = null;

    this.croppedImage = '';

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
