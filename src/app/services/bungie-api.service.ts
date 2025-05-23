import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BungieApiService {

  private tokenBungie: any = "";

  constructor(
    private http: HttpClient
  ) { }

  login() {
    window.location.href = `${environment.bungie_authorize_url}?client_id=${environment.bungie_client_id}&response_type=code&redirect_uri=${environment.bungie_redirect_uri}`;
  }

  exchangeCodeForToken(code: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('client_id', environment.bungie_client_id);

    return this.http.post(environment.bungie_token_url, body.toString(), { headers });
  }
}
