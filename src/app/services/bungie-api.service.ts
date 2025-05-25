import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(
    private http: HttpClient,
    private router: Router,
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
    localStorage.removeItem('membership');
    
    this.router.navigate(['/home']);
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
      // check if there is a membership in localStorage
      const membershipRaw = localStorage.getItem('membership');
      if (membershipRaw) {
        const membershipData = JSON.parse(membershipRaw);
        // check validity
        if (Date.now() < membershipData.expires_at) {
          observer.next(membershipData);
          return;
        } else {
          localStorage.removeItem('membership');
        }
      }

      // if there is no membership in localStorage, get it from the API
      this.http.get(environment.bungie_membership_url)
        .subscribe((res: any) => {
          const primaryId = res?.Response?.primaryMembershipId;
          const destinyMembership = res?.Response?.destinyMemberships?.find(
            (m: any) => m.membershipId === primaryId
          );

          if (destinyMembership) {
            const membershipType = destinyMembership.membershipType;
            const membershipId = destinyMembership.membershipId;

            const membershipData = {
              membershipType: membershipType,
              membershipId: membershipId,
              expires_at: '',
            };

            // saves the membership data in localStorage with the same expiration time as the token
            const tokenRaw = localStorage.getItem('auth');
            if (tokenRaw) {
              const tokenData = JSON.parse(tokenRaw);
              membershipData['expires_at'] = tokenData.expires_at;
              localStorage.setItem('membership', JSON.stringify(membershipData));
            }
            
            observer.next(membershipData);
          } else {
            observer.error('Não foi possível obter o membership do jogador.');
          }
        });
    });
  }


}
