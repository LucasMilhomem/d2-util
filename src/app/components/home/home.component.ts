import { Component, OnInit } from '@angular/core';
import { BungieApiService, IMembership } from 'src/app/services/bungie-api.service';
import { HomeService } from './home.service';

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
  ){}

  ngOnInit(): void {
    this.logs.push('Logging...');
    if(!this.bungieApiService.isLoggedIn()) 
      this.bungieApiService.login();

    this.logs.push('Logged In!');

    this.logs.push('Fetching Membership...');
    this.bungieApiService.getMembership().subscribe((membership: IMembership | null) => {
      this.logs.push('Membership fetched successfully!');
      
      this.logs.push(`Fetching Profile...`);
      this.homeService.getProfileInventory(membership!.membershipType, membership!.membershipId ).subscribe((builds: any) => {
          this.logs.push('Profile fetched successfully!');
          
          console.log('Builds:', builds);
       });
    });

    
  }

}
