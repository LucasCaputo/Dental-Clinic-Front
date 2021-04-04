import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateRoutesGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoged = this.authService.isLoged();

    if (isLoged) {
      return true;
    }

    this.router.navigate(['login']);

    return false;
  }
}
