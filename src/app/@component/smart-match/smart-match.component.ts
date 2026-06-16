import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchService } from '../../@service/match.service';

// 定義一對多的資料結構
export interface HouseMatchResult {
  houseId: number;
  name: string;
  rentPrice: number;
  houseType: string;
  score: number;
  reason: string;
}

@Component({
  selector: 'app-smart-match',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './smart-match.component.html',
  styleUrls: ['./smart-match.component.scss']
})
export class SmartMatchComponent {
  isLoading: boolean = false;


  matchResults: HouseMatchResult[] = [];

  // 目前登入承租人的生活習慣假資料
 mockUser = {
    realName: "全端開發小明",
    smoke: false,
    pet: false,
    sleepTime: "23:00:00",
    bio: "軟體工程師，下班喜歡在家進行完全無噪音的室內超慢跑",
    cleanLevel: 4,
    noiseTolerance: 3,

    // 訂閱等級：1 = Free, 2 = Pro, 3 = VIP
    subscriptionTier: 1
  };
  constructor(
    private matchService: MatchService,
    private cdr: ChangeDetectorRef
  ) {}

  startMultiMatch() {
    this.isLoading = true;
    this.matchResults = [];


    this.matchService.matchAllHouses(this.mockUser).subscribe({
      next: (res: HouseMatchResult[]) => {
        console.log('成功撈回一對多配對清單：', res);
        this.matchResults = res;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('一對多連線失敗：', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
