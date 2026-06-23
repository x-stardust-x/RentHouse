import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchService } from '../../@service/match.service';
import { UserService } from '../../@service/user-service';
import Swal from 'sweetalert2';

// 定義一對多的資料結構
export interface HouseMatchResult {
  houseId: number;
  name: string;
  rentPrice: number;
  houseType: string;
  score: number;
  basis: string;
  risk: string;
  suggestion: string;
}

@Component({
  selector: 'app-smart-match',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './smart-match.component.html',
  styleUrls: ['./smart-match.component.scss']
})
export class SmartMatchComponent implements OnInit {
  isLoading: boolean = false;
  matchResults: HouseMatchResult[] = [];

  isVip: boolean = false;
  currentUserProfile?: any = null;

  constructor(
    private matchService: MatchService,
    private userService: UserService, // 🌟 3. 注入 UserService
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const currentTier = Number(localStorage.getItem('subscriptionTier'));
    this.isVip = currentTier === 3;

    const currentUserId = Number(localStorage.getItem('userId'));
    if (currentUserId) {
      this.fetchRealUserProfile(currentUserId);
    }
  }

  fetchRealUserProfile(userId: number) {


    this.userService.getProfileObservable(userId).subscribe({
      next: (res: any) => {
        this.currentUserProfile = res;
        console.log('背景成功取得真實會員靈魂：', this.currentUserProfile);

        if (res.subscriptionTier === 3) {
          this.isVip = true;
          localStorage.setItem('subscriptionTier', '3');
        }
      },
      error: (err) => {
        console.error('無法取得會員資料', err);
      }
    });
  }

  startMultiMatch() {

    if (!this.currentUserProfile) {
      Swal.fire({
        title: '資料不完整',
        text: '請先至會員中心填寫您的生活習慣與找房偏好，AI 才能為您精準配對喔！',
        icon: 'warning',
        confirmButtonColor: '#e91e63'
      });
      return;
    }

    this.isLoading = true;
    this.matchResults = [];


    this.matchService.matchAllHouses(this.currentUserProfile).subscribe({
      next: (res: HouseMatchResult[]) => {
        console.log('成功撈回真實配對清單：', res);
        this.matchResults = res;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('一對多連線失敗：', err);

        const errorMsg = err.error?.message || '系統目前較為擁擠，請稍後再呼叫 AI 秘書。';

        Swal.fire({
          title: 'AI 媒合暫時無法使用',
          text: errorMsg,
          icon: 'warning',
          confirmButtonColor: '#e91e63',
          confirmButtonText: '我知道了'
        });

        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
