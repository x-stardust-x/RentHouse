import { Component,inject } from '@angular/core';
import { Authservice } from '../../@service/authservice';
import { NewsService } from '../../@service/news-service';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-admin-component',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.scss',
})
export class AdminComponent {
  authsev = inject(Authservice);
  newsev = inject(NewsService);

  constructor(){
    this.newsev.getAll();
  }


  Logout(){
    this.authsev.logout();
  }
  test(){
    this.authsev.test().subscribe(res =>{
      console.log(res);

    });
  }

}
