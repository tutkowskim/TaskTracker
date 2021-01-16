import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

export interface User {
  identityProvider: string;
  userId: string;
  userDetails: String;
  userRoles: string[];
}

export interface UserPrincipal {
  clientPrincipal: User | null;
}

/**
 * Service for interacting with the built in authentication for Azure Static Web Apps.
 * 
 * Documentation:
 * - https://docs.microsoft.com/en-us/azure/static-web-apps/authentication-authorization
 * - https://docs.microsoft.com/en-us/azure/static-web-apps/user-information?tabs=javascript
 * - 
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly getCurrentUserUrl: string = '/.auth/me';
  private readonly loginWithGoogleUrl: string ='/.auth/login/google';
  private readonly logoutUrl: string = '/.auth/logout';

  public readonly userPrincipal$: Observable<UserPrincipal>;
  public readonly isAuthenticated$: Observable<boolean>;

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {
    this.userPrincipal$ = this.http.get<UserPrincipal>(this.getCurrentUserUrl);
    this.isAuthenticated$ = this.userPrincipal$.pipe(map(userPrincipal => !!userPrincipal.clientPrincipal ));
  }

  public loginWithGoogle(postLoginRedirect: string = '/') {
    this.document.location.href = `${this.loginWithGoogleUrl}?post_login_redirect_uri=${postLoginRedirect}`;
  }

  public logout(postLogoutRedirect: string = '/') {
    this.document.location.href = `${this.logoutUrl}?post_logout_redirect_uri =${postLogoutRedirect}`;
  }
}
