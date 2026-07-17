import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
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
  private readonly baseUrl = `${environment.apiUrl}/Subscription`;

  readonly currentSubscription = signal<SubscriptionDto | null>(null);

  getPlans() {
    return this.http.get<PlanDto[]>(`${this.baseUrl}/plans`);
  }

  loadMySubscription() {
    return this.http
      .get<ApiResponse<SubscriptionDto>>(`${this.baseUrl}/my-subscription`)
      .pipe(tap((res) => res.isSuccess && this.currentSubscription.set(res.data)));
  }

  createCheckoutSession(plan: PlanTier|string) {
    return this.http.post<ApiResponse<CheckoutSessionResponse>>(
      `${this.baseUrl}/checkout-session`,
      { plan },
    );
  }

  createPortalSession() {
    return this.http.post<ApiResponse<PortalSessionResponse>>(
      `${this.baseUrl}/portal-session`,
      {},
    );
  }
}
