import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Membership } from '../models/membership.model';
import { Item } from '../models/item.model';

interface InventoryData {
  characters: {
    [characterId: string]: {
      inventory: Item[];
      equipment: Item[];
    };
  };
  profileInventory: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class BungieApiService {

  inventoryData: InventoryData = {
    characters: {},
    profileInventory: []
  };
  
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
    return new Observable<Membership | null>(observer => {
      // check if there is a membership in localStorage
      const membershipRaw = localStorage.getItem('d2_profile_data');
      if (membershipRaw) {
        const membershipData = JSON.parse(membershipRaw);
        // check validity
        if (Date.now() < membershipData.expires_at) {
          observer.next(<Membership>{
            membershipType: membershipData.membershipType,
            membershipId: membershipData.membershipId,
          });
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
              localStorage.setItem('d2_profile_data', JSON.stringify(membershipData));
            }
            
            observer.next(membershipData);
          } else {
            observer.error('Error fetching membership data');
          }
        });
    });
  }

  getProfileInventory() {
    return new Observable<any>(observer => {
      this.getMembership().subscribe({
        next: (membership: Membership | null) => {
          const components = [100, 102, 200, 201, 205].join(',');
          const membershipType = membership!.membershipType;
          const membershipId = membership!.membershipId;
    
          const url = `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=${components}`;
          this.http.get(url).subscribe({
            next: (response: any) => {
              const rawCharacterInventories = response.Response.characterInventories.data;
              const rawProfileInventory = response.Response.profileInventory.data.items;

              const organized: InventoryData = {
                characters: {},
                profileInventory: rawProfileInventory
              };
              
              //character inventories
              for (const [characterId, data] of Object.entries(rawCharacterInventories)) {
                organized.characters[characterId] = {
                  inventory: (data as any).items || [],
                  equipment: rawCharacterInventories[characterId]?.items || [],
                };
              }

              this.inventoryData = organized;

              observer.next(this.inventoryData);
            },
            error: (err) => {
              console.error('Error fetching profile inventory:', err);
              observer.error(err);
            }
          });
        },
        error: (err) => {
          console.error('Error fetching membership:', err);
          observer.error(err);
        }});
    });
  }

}
