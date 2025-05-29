import { Injectable } from '@angular/core';
import { BungieApiService } from 'src/app/services/bungie-api.service';
import { ManifestService } from 'src/app/services/manifest.service';
import { Membership } from 'src/app/models/membership.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(
    private bungieApiService: BungieApiService,
    private manifestService: ManifestService
  ) {}

  async runStartupFlow(logs: string[]): Promise<void> {
    logs.push('Logging...');
    if (!this.bungieApiService.isLoggedIn()) {
      this.bungieApiService.login();
      return;
    }

    logs.push('Logged In!');

    logs.push('Fetching Membership...');
    return new Promise((resolve) => {
      this.bungieApiService.getMembership().subscribe((_membership: Membership | null) => {
        logs.push('Membership fetched successfully!');

          logs.push(`Fetching Manifest...`);
          this.manifestService.init().then(() => {
            logs.push('Manifest initialized successfully!');
            resolve();
          });
      });
    });
  }
}