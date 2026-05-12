import { Component, inject } from '@angular/core';
import { Authservice } from '../../@service/authservice';

@Component({
  selector: 'app-member-component',
  imports: [],
  templateUrl: './member-component.html',
  styleUrl: './member-component.scss',
})
export class MemberComponent {
  logout = inject(Authservice);
  authsev = inject(Authservice);



  Logout(){
    this.logout.logout();
  }
  test(){

    var id = this.authsev.getUserId();
    console.log(id);

    this.authsev.test().subscribe(res =>{
      console.log(res);
    });
  }

}
