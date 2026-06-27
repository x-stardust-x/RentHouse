import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RentalMatchingService } from '../../@service/rental-matching-service';
import { UserService } from '../../@service/user-service';
import { faLine } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-lessor-profile-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './lessor-profile-component.html',
  styleUrl: './lessor-profile-component.scss',
})
export class LessorProfileComponent implements OnInit {

  faLine = faLine;

  // private route = inject(ActivatedRoute);
  private rentalService = inject(RentalMatchingService);

  profileData = signal<any>(null);

  constructor(
    private userService: UserService,       // 👈 寫在這裡！注入妳的 UserService
    private route: ActivatedRoute           // 用來抓網址 id 的服務
  ) { }

  ngOnInit(): void {
    // 1. 抓取網址上的 id (例如：.../lessor-profile/104 裡面的 104)
    const accountId = Number(this.route.snapshot.paramMap.get('id'));

    if (accountId) {
      // 2. 當頁面一載入，立刻用 accountId 向後端要資料
      this.userService.getLessorProfile(accountId).subscribe({
        next: (data: any) => {
          console.log("前端實際收到的會員資料：", data); // 👈 可以在 F12 Console 觀察結構

          // 🟢 關鍵點：必須透過 .set() 把後端吐回來的 data 餵給 Signal，HTML 畫面才會亮起來！
          this.profileData.set(data);
        },
        error: (err: any) => {
          console.error('載入個人檔案失敗：', err);
        }
      });
    } else {
      console.warn('網址上找不到正確的會員 id');
    }
  }

  // 解析 JSON 興趣字串
  // getInterestsArray(interestsJson: string): string[] {
  //   try {
  //     return interestsJson ? JSON.parse(interestsJson) : [];
  //   } catch (e) {
  //     return [];
  //   }
  // }


  getInterestsArray(interests: string | undefined | null): string[] {
    if (!interests) {
      return [];
    }

    try {
      const parsed = JSON.parse(interests);

      if (Array.isArray(parsed)) {
        return parsed
          .map(item => String(item).trim())
          .filter(item => item.length > 0);
      }
    } catch {
      // 非 JSON 就往下用分隔符切
    }

    return interests
      .split(/[,，、\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .filter((item, index, array) => array.indexOf(item) === index);
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

  petPreferenceLabel(value: boolean | string | number | null | undefined): string {
    const accepted =
      value === true ||
      value === 'true' ||
      value === 1 ||
      value === '1';

    return accepted ? '可接受寵物' : '不偏好寵物';
  }

  smokePreferenceLabel(value: boolean | string | number | null | undefined): string {
    const accepted =
      value === true ||
      value === 'true' ||
      value === 1 ||
      value === '1';

    return accepted ? '可接受吸菸環境' : '不接受吸菸環境';
  }

  routinePreferenceLabel(value: string | number | null | undefined): string {
    const hour = this.getHourFromTime(value);

    if (hour === null) {
      return '尚未提供';
    }

    if (hour >= 21 && hour <= 23) {
      return '早睡早起';
    }

    if (hour >= 0 && hour <= 3) {
      return '夜貓子';
    }

    return '正常作息';
  }

  private getHourFromTime(value: string | number | null | undefined): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (typeof value === 'number') {
      return value;
    }

    const match = String(value).match(/^(\d{1,2})/);

    if (!match) {
      return null;
    }

    return Number(match[1]);
  }

  getPhoneHref(profile: any): string | null {
    const phone = this.normalizePhone(profile?.phone ?? profile?.Phone);

    if (!phone) {
      return null;
    }

    return `tel:${phone}`;
  }

  getLineHref(profile: any): string | null {
    const lineId = this.normalizeLineId(profile?.lineId ?? profile?.LineId);

    if (!lineId) {
      return null;
    }

    // 官方帳號通常會是 @ 開頭
    if (lineId.startsWith('@')) {
      return `https://line.me/R/ti/p/${lineId}`;
    }

    // 一般 LINE ID 常用 ~id 格式
    return `https://line.me/R/ti/p/~${lineId}`;
  }

  private normalizePhone(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    return String(value)
      .trim()
      .replace(/[^\d+]/g, '');
  }

  private normalizeLineId(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    return String(value)
      .trim()
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9@._-]/g, '');
  }

  handleContactClick(event: Event, href: string | null, message: string): void {
    if (href) {
      return;
    }

    event.preventDefault();
    window.alert(message);
  }

  private readonly apiBaseUrl = 'https://localhost:7215';

  normalizeResourceImageUrl(url: string | null | undefined): string {
    if (!url) {
      return 'assets/default-house.jpg';
    }

    const value = String(url).trim().replace(/\\/g, '/');

    if (
      value.startsWith('http://') ||
      value.startsWith('https://') ||
      value.startsWith('assets/') ||
      value.startsWith('images/')
    ) {
      return value;
    }

    if (value.startsWith('/')) {
      return `${this.apiBaseUrl}${value}`;
    }

    if (value.startsWith('Uploads/')) {
      return `${this.apiBaseUrl}/${value}`;
    }

    return value;
  }

  getProvidedResources(profile: any): any[] {
    const houses = (profile?.activeHouses ?? profile?.ActiveHouses ?? []).map((item: any) => ({
      ...item,
      id: item.id ?? item.Id,
      name: item.name ?? item.Name,
      displayType: 'room',
      price: item.rentPrice ?? item.RentPrice ?? 0,
      priceUnit: '月',
      mainImageUrl: item.mainImageUrl ?? item.MainImageUrl
    }));

    const products = (profile?.activeProducts ?? profile?.ActiveProducts ?? []).map((item: any) => ({
      ...item,
      id: item.id ?? item.Id,
      name: item.name ?? item.Name,
      category: item.category ?? item.Category,
      displayType: 'product',
      price: item.price ?? item.Price ?? 0,
      priceUnit: item.priceUnit ?? item.PriceUnit ?? '次',
      mainImageUrl: item.mainImageUrl ?? item.MainImageUrl
    }));

    return [...houses, ...products];
  }

  resourceTypeLabel(resource: any): string {
    if (resource.displayType === 'room') {
      return '房源';
    }

    const category = String(resource.category ?? '').trim();

    if (category === '專業諮詢' || category === '技能') {
      return '技能';
    }

    if (category === '工具共享' || category === '工具') {
      return '工具';
    }

    return '資源';
  }
}
