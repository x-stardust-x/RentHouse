import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Router, RouterLink } from "@angular/router";
import { Authservice } from '../../../@service/authservice';
import { UserService } from '../../../@service/user-service';
import { LocationService } from '../../../@service/location-service';
import { HouseService } from '../../../@service/house.service';
import { HouseViewingService } from '../../../@service/house-viewing-service';
import { RentalMatchingService } from '../../../@service/rental-matching-service';
import { MatchHouseDto } from '../../../@interface/match-house';

interface HouseRecommendation {
  id: number;
  imageUrl: string;
  title: string;
  location: string;
  matchScore: number;
  tags: { icon: string; text: string }[];
  price: number;
  link : string;
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

  private readonly authsev = inject(Authservice);
  public usersev = inject(UserService);
  public locsev = inject(LocationService);
  public housesev = inject(HouseService);
  private viewingService = inject(HouseViewingService);
  private rentalsev = inject(RentalMatchingService);
  private router = inject(Router);


  accountId = Number(this.authsev.getAccountId());
  userId = this.authsev.getUserId();
  houses = signal<MatchHouseDto[]>([]);
  constructor(){
    this.usersev.loadProfile(this.userId);
    this.locsev.getUserLocation(this.userId);
    this.rentalsev.getRentals().subscribe((res) =>{
      this.houses.set(res);
      console.log(this.houses());
    })
    this.locsev.loadAllDistricts();
  }


  role = '承租人';

  // 目前媒合狀態資料
  currentMatch = {
    address: '高雄市前鎮區廣四路 12 號 5 樓',
    expiryDate: '2026/12/31',
    matchScore: 92,
    nextViewing: '本週五 14:00'
  };

  // 精選共居空間資料
 recommendations = computed<HouseRecommendation[]>(() => {
  const shuffled = [...this.houses()]
    .sort(() => Math.random() - 0.5);

  return shuffled
    .slice(0, 3)
    .map(house => ({
      id: house.id,
      imageUrl: this.getCoverUrl(house) ?? 'assets/images/no-image.png',
      title: house.name,
      location: house.address,
      matchScore: 0,
      price: house.rentPrice,
      link : `/rental-matching-detail/room/` + house.houseId,
      tags: [
        ...(house.pet ? [{ icon: 'pets', text: '可養寵物' }] : []),
        ...(house.includeWifi ? [{ icon: 'wifi', text: '附 Wi-Fi' }] : []),
        ...(house.includeUtilities ? [{ icon: 'bolt', text: '含水電' }] : []),
        ...(house.includeManagementFee ? [{ icon: 'apartment', text: '含管理費' }] : [])
      ]
    }));
});

  getCoverUrl(item: any): string {
    let finalUrl = '';


    if (item.coverUrl) finalUrl = item.coverUrl;
    else if (item.CoverUrl) finalUrl = item.CoverUrl;
    else if (item.images && item.images.length > 0) {
      const coverImg = item.images.find((img: any) => img.isCover === true || img.IsCover === true);
      finalUrl = coverImg ? (coverImg.url || coverImg.Url) : (item.images[0].url || item.images[0].Url);
    }
    else if (item.Images && item.Images.length > 0) {
      const coverImg = item.Images.find((img: any) => img.isCover === true || img.IsCover === true);
      finalUrl = coverImg ? (coverImg.url || coverImg.Url) : (item.Images[0].url || item.Images[0].Url);
    }
    else if (item.imageUrls && item.imageUrls.length > 0) finalUrl = item.imageUrls[0];
    else if (item.ImageUrls && item.ImageUrls.length > 0) finalUrl = item.ImageUrls[0];
    else if (item.url) finalUrl = item.url;
    else if (item.Url) finalUrl = item.Url;


    if (finalUrl) {

      if (finalUrl.startsWith('/')) {
        return `https://localhost:7215${finalUrl}`;
      }

      return finalUrl;
    }


    return 'https://via.placeholder.com/400x300/EFEFEF/999999?text=No+Image';
  }
  openDetail(link: string) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([link])
    );

    window.open(url, '_blank');
  }
}
