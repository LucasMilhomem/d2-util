import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IMembership {
  membershipType: string;
  membershipId: string;
}

@Injectable({
  providedIn: 'root'
})
export class BungieApiService {

  private membership: IMembership | null = null;

  constructor(
    private http: HttpClient
  ) { }

  login() {
    window.location.href = `${environment.bungie_authorize_url}?client_id=${environment.bungie_client_id}&response_type=code&redirect_uri=${environment.bungie_redirect_uri}`;
  }

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

  exchangeCodeForToken(code: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('client_id', environment.bungie_client_id);

    return new Observable<any>(observer => {
      this.http.post(environment.bungie_token_url, body.toString(), { headers }).subscribe({
        next: (response: any) => {
          const expiresIn = response.expires_in;
          const expiresAt = Date.now() + expiresIn * 1000;

          const tokenData = {
            access_token: response.access_token,
            expires_at: expiresAt
          };

          localStorage.setItem('auth', JSON.stringify(tokenData));
          observer.next(true);
        },
        error: (err) => {
          observer.error(err);
          console.error('Erro exchanging Token:', err);
        }
      });
    });
  }

  getMembership() {
    return new Observable<IMembership | null>(observer => {
      if (this.membership) {
        observer.next(this.membership);
      }

      this.http.get(environment.bungie_membership_url)
        .subscribe((res: any) => {
          const primaryId = res?.Response?.primaryMembershipId;
          const destinyMembership = res?.Response?.destinyMemberships?.find(
            (m: any) => m.membershipId === primaryId
          );

          if (destinyMembership) {
            const membershipType = destinyMembership.membershipType;
            const membershipId = destinyMembership.membershipId;

            this.membership  = {
              membershipType: membershipType,
              membershipId: membershipId
            };
            
            observer.next(this.membership);
          } else {
            observer.error('Não foi possível obter o membership do jogador.');
          }
        });
    });
  }


}
