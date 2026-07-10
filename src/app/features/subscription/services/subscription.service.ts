import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { ApiResponse } from '../../authentication/models/auth.models';
import {
  CheckoutSessionResponse,
  PlanDto,
  PlanTier,
  PortalSessionResponse,
  SubscriptionDto,
} from '../models/subscription.models';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly baseUrl = `${environment.apiUrl}/Subscription`;

  readonly currentSubscription = signal<SubscriptionDto | null>(null);

  private authHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  getPlans() {
    return this.http.get<PlanDto[]>(`${this.baseUrl}/plans`);
  }

  loadMySubscription() {
    return this.http
      .get<ApiResponse<SubscriptionDto>>(`${this.baseUrl}/my-subscription`, {
        headers: this.authHeaders(),
      })
      .pipe(tap((res) => res.isSuccess && this.currentSubscription.set(res.data)));
  }

  createCheckoutSession(plan: PlanTier|string) {
    return this.http.post<ApiResponse<CheckoutSessionResponse>>(
      `${this.baseUrl}/checkout-session`,
      { plan },
      { headers: this.authHeaders() }
    );
  }

  createPortalSession() {
    return this.http.post<ApiResponse<PortalSessionResponse>>(
      `${this.baseUrl}/portal-session`,
      {},
      { headers: this.authHeaders() }
    );
  }
}
