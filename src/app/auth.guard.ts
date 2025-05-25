import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BungieApiService } from './services/bungie-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private bungieApiService: BungieApiService, private router: Router) {}

  canActivate(): boolean {
    if (this.bungieApiService.isLoggedIn()) return true;

    this.router.navigate(['']);
    return false;
  }
  
}
