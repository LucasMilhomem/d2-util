import { Component, OnInit } from '@angular/core';
import { BungieApiService } from 'src/app/services/bungie-api.service';
import { HomeService } from './home.service';
import { Membership } from 'src/app/models/membership.model';
import { ManifestService } from 'src/app/services/manifest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  logs: string[] = [
    'App Starting...',
  ];

  constructor(
    private bungieApiService : BungieApiService,
    private homeService: HomeService,
    private manifestService: ManifestService,
  ){}

  ngOnInit(): void {
    this.logs.push('Logging...');
    if(!this.bungieApiService.isLoggedIn()) 
      this.bungieApiService.login();

    this.logs.push('Logged In!');

    this.logs.push('Fetching Membership...');
    this.bungieApiService.getMembership().subscribe((_membership: Membership | null) => {
      this.logs.push('Membership fetched successfully!');
      
      this.logs.push(`Fetching Profile...`);
      this.bungieApiService.getProfileInventory().subscribe(() => {
          this.logs.push('Profile fetched successfully!');

          this.logs.push(`Fetching Manifest...`);
          this.manifestService.init().then(() => {
            this.logs.push('Manifest initialized successfully!');
          });
      });
   });
  }

}
