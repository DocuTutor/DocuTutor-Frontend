import { Injectable } from '@angular/core';
import { LoginResponseData } from '../../features/authentication/models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthStateService {

  private user: LoginResponseData | null = null;

  setUser(user: LoginResponseData) {
    this.user = user;
  }

  getAccessToken() {
    return this.user?.token || null;
  }

  getRefreshToken() {
    return this.user?.refreshToken || null;
  }

  clear() {
    this.user = null;
  }
}