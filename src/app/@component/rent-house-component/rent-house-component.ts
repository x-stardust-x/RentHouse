import { Component, signal } from '@angular/core';
import { HouseFormComponent } from './house-form/house-form.component'; // 🌟 引入拆出去的房屋表單
import { ProductFormComponent } from './product-form/product-form.component'; // 🌟 引入拆出去的資產表單

@Component({
  selector: 'app-rent-house-component',
  standalone: true,
  imports: [HouseFormComponent, ProductFormComponent], // 🌟 注入兩個子元件
  templateUrl: './rent-house-component.html',
  styleUrl: './rent-house-component.scss'
})
export class RentHouseComponent {
  // 🧠 司令部只需要管現在切換到哪一個 Tab
  currentTab = signal<string>('rooms');

  setTab(tabName: string) {
    this.currentTab.set(tabName);
  }
}
