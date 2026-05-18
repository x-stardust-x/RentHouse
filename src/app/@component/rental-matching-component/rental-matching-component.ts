import { MatSliderModule } from '@angular/material/slider';
import { Component, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RentalMatchingService } from '../../@service/rental-matching-service';
import { MatchHouseDto } from '../../@interface/match-house';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-rental-matching-component',
  imports: [CommonModule, MatSliderModule, FormsModule, MatSlideToggleModule, MatExpansionModule],
  templateUrl: './rental-matching-component.html',
  styleUrl: './rental-matching-component.scss',

})


export class RentalMatchingComponent implements OnInit {

  houses = signal<MatchHouseDto[]>([]);

  city: string = '';
  rentalItemCount: number = 0;
  viewMode: 'grid' | 'map' = 'grid';

  priceMin = 5000;
  priceMax = 25000;

  isSmartMatch: boolean = false;

  readonly panelOpenState = signal(false);


  constructor(private rentalMatchingService: RentalMatchingService, private router: Router) { }

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

  formatPrice(value: number): string {
    return value.toLocaleString();
  }

  onToggleChange() {
    console.log('智慧配對狀態：', this.isSmartMatch);

    //在此呼叫後端 C# API 重新計算或篩選 Match_Score
  }

}
