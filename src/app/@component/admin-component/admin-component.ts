import { Component,inject, signal } from '@angular/core';
import { Authservice } from '../../@service/authservice';
import { NewsService } from '../../@service/news-service';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-admin-component',
  imports: [ RouterOutlet],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.scss',
})
export class AdminComponent {
  authsev = inject(Authservice);
  newsev = inject(NewsService);
  ipAddress = signal<string | Object>('');

  constructor(){
    this.newsev.getAll();
    this.getClientIPAddress();
  }


  Logout(){
    this.authsev.logout();
  }
  test(){
    this.authsev.test().subscribe(res =>{
      console.log(res);

    });
  }
  getClientIPAddress(){
    this.authsev.getClientIPAddress().subscribe(res =>{
      this.ipAddress.set(res);
    });
  }

  test2(){
    console.log(this.ipAddress());

  }

}
