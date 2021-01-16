import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user$: Observable<any>;
  public isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.userPrincipal$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  public login() {
    this.authService.loginWithGoogle();
  }

  public logout() {
    this.authService.logout();
  }
}
