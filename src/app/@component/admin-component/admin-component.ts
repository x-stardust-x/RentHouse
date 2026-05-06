import { Component,inject } from '@angular/core';
import { Authservice } from '../../@service/authservice';

@Component({
  selector: 'app-admin-component',
  imports: [],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.scss',
})
export class AdminComponent {
  authsev = inject(Authservice);

  Logout(){
    this.authsev.logout();
  }
  test(){
    this.authsev.test().subscribe(res =>{
      console.log(res);

    });
  }

}
