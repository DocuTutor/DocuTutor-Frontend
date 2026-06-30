import { Injectable } from '@angular/core';
import { LoginResponse } from '../../features/authentication/models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthStateService {

  private user: LoginResponse | null = null;

  setUser(user: LoginResponse) {
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