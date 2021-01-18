import { Component, } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public readonly user$: Observable<User|null>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.userPrincipal$
      .pipe(map(userPrincipal => userPrincipal.clientPrincipal));
  }
}
