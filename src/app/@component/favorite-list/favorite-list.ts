import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseService } from '../../@service/house.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorite-list.html',
  styleUrl: './favorite-list.scss'
})
export class FavoriteListComponent implements OnInit {

  // 用 Signal 來裝撈回來的收藏房屋清單
  favoriteHouses = signal<any[]>([]);
  isLoading = signal<boolean>(true);

  constructor(private houseService: HouseService) {}

  ngOnInit(): void {
    this.loadMyFavorites();
  }

  loadMyFavorites() {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('請先登入！');
      this.isLoading.set(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentAccountId = Number(payload.AccountId);

      if (currentAccountId) {
        this.houseService.getMyFavorites(currentAccountId).subscribe({
          next: (data) => {
            console.log('🔥 我的收藏清單：', data);
            this.favoriteHouses.set(data);
            this.isLoading.set(false);
          },
          error: (err) => {
            console.error('撈取收藏清單失敗', err);
            this.isLoading.set(false);
          }
        });
      }
    } catch (e) {
      console.error('Token 解析失敗', e);
      this.isLoading.set(false);
    }
  }

}
