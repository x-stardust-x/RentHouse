import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { HouseService } from '../../@service/house.service';
import { AlertService } from '../../@service/alert-service';

@Component({
  selector: 'app-house-management',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './house-management.html',
  styleUrl: './house-management.scss'
})
export class HouseManagementComponent implements OnInit {

  myHouses = signal<any[]>([]);
  isLoading = signal<boolean>(true);
  loadError = signal('');

  readonly loadingCards = Array.from({ length: 6 });

  accountId: number = 0;

  constructor(
    private houseService: HouseService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.isLoading.set(false);
      this.loadError.set('找不到登入資訊，請重新登入後再試。');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.accountId = Number(payload.AccountId);

      if (!this.accountId) {
        this.isLoading.set(false);
        this.loadError.set('無法取得會員資料，請重新登入後再試。');
        return;
      }

      this.loadMyHouses();

    } catch (e) {
      console.error('解析 Token 失敗', e);
      this.isLoading.set(false);
      this.loadError.set('登入資訊異常，請重新登入後再試。');
    }
  }

  loadMyHouses() {
    this.isLoading.set(true);
    this.loadError.set('');

    this.houseService.getMyHouses(this.accountId)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: (data) => {
          console.log('後端傳來的資料：', data);
          this.myHouses.set(data);
        },
        error: (err) => {
          console.error('讀取失敗', err);
          this.myHouses.set([]);
          this.loadError.set('房源資料載入失敗，請稍後再試。');
        }
      });
  }

  editHouse(id: number) {
    this.router.navigate(['/user-center/rent'], { queryParams: { editId: id } });
  }

  async deleteMyHouse(id: number) {

    var res = await this.alert.confirm("確定要刪除這個房源嗎？","這將無法復原喔！");

    if (res.isConfirmed) {
      this.houseService.deleteHouse(id).subscribe({
        next: () => {
          this.alert.toastSuccess('房源已成功刪除！');
          this.loadMyHouses();
        },
        error: (err) => this.alert.error('刪除失敗，請稍後再試')
      });
    }
  }
}
