import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getToken(): string | null {
    const raw = localStorage.getItem('auth');
    if (!raw) return null;

    const tokenData = JSON.parse(raw);
    if (Date.now() > tokenData.expires_at) {
      this.logout();
      return null;
    }

    return tokenData.access_token;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth');
    // redirect maybe
  }
}