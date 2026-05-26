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


  getInterestsArray(interests: string | undefined): string[] {
    if (!interests) {
      return [];
    }

    try {
      // 1. 如果資料庫存的是標準 JSON 陣列字串 (例如：'["音樂","電影"]')
      const parsed = JSON.parse(interests);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      // 2. 如果解析失敗，代表是普通字串，改用正規表達式同時相容「英文逗號 , 」與「中文逗號 ，」
      return interests
        .split(/[,，]/)                       // 同時支援中英文逗號切割
        .map(item => item.trim())            // 去除前後空白
        .filter(item => item !== '');        // 過濾掉空字串
    }

    // 備用防呆
    return [interests];
  }
}
