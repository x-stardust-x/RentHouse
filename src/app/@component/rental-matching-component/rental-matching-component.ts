import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental-matching-component',
  imports: [],
  templateUrl: './rental-matching-component.html',
  styleUrl: './rental-matching-component.scss',
})
export class RentalMatchingComponent {
  city: string = '';
  rentalItemCount: number = 0;
  viewMode: 'grid' | 'map' = 'grid';

  constructor(private router: Router) {}

  navigateToDetail(id: string) {
    this.router.navigate(['/rental-matching-detail', id]);
  }
}
