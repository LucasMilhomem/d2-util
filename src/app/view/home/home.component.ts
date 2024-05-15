import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BungieService } from '../../service/bungie-service.service';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  constructor(
    private bungieService : BungieService,
  ){}

  login(){
    this.bungieService.login();
  }
}
