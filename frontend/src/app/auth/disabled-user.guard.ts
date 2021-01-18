import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DisabledUserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (!(await this.authService.isAuthenticated$.toPromise())) {
      return this.router.parseUrl('/login');
    } else if (!(await this.authService.isPrivilegedUser$.toPromise())) {
      return this.router.parseUrl('/disabled-user');
    }else {
      return true;
    }
  }
}