import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-profile-toolbar',
  templateUrl: './user-profile-toolbar.component.html',
  styleUrls: ['./user-profile-toolbar.component.scss']
})
export class UserProfileToolbarComponent {
  public readonly isAuthenticated$: Observable<boolean>;
  public readonly userDisplayName$: Observable<string>;

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.userDisplayName$ = this.authService.userPrincipal$.pipe(map(up => up.clientPrincipal?.userDetails || ''));
  }

  public openProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  public logout(): void {
    this.authService.logout();
  }
}
