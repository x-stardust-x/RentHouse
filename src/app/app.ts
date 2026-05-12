import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { LoginComponent } from "./@component/login-component/login-component";
import { Authservice } from './@service/authservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('RentHouse');
  private readonly auth = inject(Authservice);
  isloggedin : boolean = this.auth.isLoggedIn();
}
