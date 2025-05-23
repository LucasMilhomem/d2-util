import { Component, OnInit } from '@angular/core';
import { BungieApiService } from './services/bungie-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private bungieApiService : BungieApiService,
  ){}

  ngOnInit(): void {
    //this.bungieApiService.login();
  }
}
