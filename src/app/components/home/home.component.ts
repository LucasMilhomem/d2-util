import { Component, OnInit } from '@angular/core';
import { BungieApiService } from 'src/app/services/bungie-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private bungieApiService : BungieApiService,
  ){}

  ngOnInit(): void {
    this.bungieApiService.login();
  }

}
