import { Component, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RentalMatchingService } from '../../@service/rental-matching-service';
import { MatchHouseDto } from '../../@interface/match-house';
import { CommonModule } from '@angular/common';
// import { RentalService } from


@Component({
  selector: 'app-rental-matching-component',
  imports: [CommonModule],
  templateUrl: './rental-matching-component.html',
  styleUrl: './rental-matching-component.scss',
})

export class RentalMatchingComponent implements OnInit {

  houses = signal<MatchHouseDto[]>([]);

  city: string = '';
  rentalItemCount: number = 0;
  viewMode: 'grid' | 'map' = 'grid';

  constructor(private rentalMatchingService: RentalMatchingService, private router: Router) {}

  ngOnInit(): void {
    this.rentalMatchingService.getRentals().subscribe({
      next: (data) => {
        this.houses.set(data);
        this.rentalItemCount = data.length;
        console.log('成功抓取房屋資料！', this.houses());
      },
      error: (err) => console.error('抓取資料失敗', err)
    });
  }

  navigateToDetail(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/rental-matching-detail', id]);
    } else {
      console.warn('找不到該房屋的 ID');
    }

  }

  // items = this.houses;
}
