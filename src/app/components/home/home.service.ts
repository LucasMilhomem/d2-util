import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
  ) { }

  getProfileInventory(membershipType: string, membershipId: string) {
    const components = [200, 205].join(',');

    const url = `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=${components}`;
    return this.http.get(url);
  }
}
