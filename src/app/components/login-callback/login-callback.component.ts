import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BungieApiService } from '../../services/bungie-api.service';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private bungieApiService: BungieApiService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      //console.log('Authorization Code:', code);
      this.bungieApiService.exchangeCodeForToken(code).subscribe({
          next: (response: any) => {
            const expiresIn = response.expires_in;
            const expiresAt = Date.now() + expiresIn * 1000;

            const tokenData = {
              access_token: response.access_token,
              expires_at: expiresAt
            };

            localStorage.setItem('auth', JSON.stringify(tokenData));
          },
          error: (err) => {
            console.error('Erro ao trocar o código por token:', err);
          }
        });
    });
  }

}
