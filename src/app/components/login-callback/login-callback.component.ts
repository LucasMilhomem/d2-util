import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      this.bungieApiService.exchangeCodeForToken(code).subscribe({
        next: (r) => {
          console.log('Token exchanged successfully:');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error on Bungie Callback:', error);
        }
      });
    });
  }

}
