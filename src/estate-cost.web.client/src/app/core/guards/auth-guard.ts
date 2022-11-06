import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
// import { NotificationService } from "src/app/core/services/notification.service";
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  isDevelopment = !environment.production;
  isAuthorized = false;


  constructor(
    private authService: AuthService,
    // private notify: NotificationService
  ) { }

  canActivate(): boolean {
    return this.checkUser();
  }

  canLoad(): boolean {
    return this.checkUser();
  }

  private checkUser(): boolean {
    return this.authService.getIsAuthorized();
  }
}
