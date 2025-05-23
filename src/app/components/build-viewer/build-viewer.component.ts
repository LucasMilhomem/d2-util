import { Component, OnInit } from '@angular/core';
import { BungieApiService, IMembership } from 'src/app/services/bungie-api.service';
import { BuildViewerService } from './build-viewer.service';

@Component({
  selector: 'app-build-viewer',
  templateUrl: './build-viewer.component.html',
  styleUrls: ['./build-viewer.component.scss']
})
export class BuildViewerComponent implements OnInit {

  private membership : IMembership | null = null;

  constructor(
    private bungieApiService: BungieApiService,
    private buildViewerService: BuildViewerService,
  ) { }

  ngOnInit() {
    this.bungieApiService.getMembership().subscribe((membership: IMembership | null) => {
      this.membership = membership;
      console.log('Membership:', this.membership);
    
      this.buildViewerService.getProfileInventory(this.membership!.membershipType, this.membership!.membershipId ).subscribe((builds: any) => {
        console.log('Builds:', builds);
      });
    });
  }

}
