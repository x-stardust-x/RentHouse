import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from "@angular/router";

interface HouseRecommendation {
  id: number;
  imageUrl: string;
  title: string;
  location: string;
  matchScore: number;
  tags: { icon: string; text: string }[];
  price: number;
  isHot?: boolean;
}

@Component({
  selector: 'app-tenant-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatChipsModule, RouterLink],
  templateUrl: './lessee-dashboard-component.html',
  styleUrls: ['./lessee-dashboard-component.scss']
})
export class LesseeDashboardComponent {
  userName = '李小明';
  role = '承租人';

  // 目前媒合狀態資料
  currentMatch = {
    address: '高雄市前鎮區廣四路 12 號 5 樓',
    expiryDate: '2026/12/31',
    matchScore: 92,
    nextViewing: '本週五 14:00'
  };

  // 精選共居空間資料
  recommendations: HouseRecommendation[] = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80',
      title: '暖隅共居公寓',
      location: '高雄市苓雅區',
      matchScore: 95,
      tags: [
        { icon: 'history', text: '鄰近長安' },
        { icon: 'pets', text: '可養寵物' },
        { icon: 'soup_kitchen', text: '廚具共用' }
      ],
      price: 12000
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80',
      title: '綠意巷弄雅房',
      location: '高雄市三民區',
      matchScore: 88,
      tags: [
        { icon: 'Check_circle', text: '雅房' },
        { icon: 'balcony', text: '有陽台' },
        { icon: 'directions_bus', text: '近捷運' }
      ],
      price: 8500
    }
  ];
}
