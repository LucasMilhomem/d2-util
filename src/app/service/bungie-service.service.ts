import { Injectable } from '@angular/core';
import { ApiBungieConst } from '../../assets/api-bungie.const';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BungieService {

  constructor(
    private http : HttpClient
  ) { }

  login(){
    // TODO: Check if there is some queryparam on the url named "code", if not exist call auth, if exist call token
    this.authRequest();
  }

  private authRequest(){
    let url = `${ApiBungieConst.ENDPOINT_AUTHORIZATION}`
            + `?client_id=${ApiBungieConst.CLIENT_ID}`
            + `&response_type=${ApiBungieConst.RESPONSE_TYPE}`
            + `&state=${ApiBungieConst.STATE}`;

    window.location.href = url;
  }

  private tokenRequest(){

  }
}
