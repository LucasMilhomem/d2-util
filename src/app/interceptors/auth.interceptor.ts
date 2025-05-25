import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BungieApiService } from '../services/bungie-api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private bungieApiService: BungieApiService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.bungieApiService.isLoggedIn()) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.bungieApiService.getToken()}`,
          'X-API-Key': environment.bungie_api_key,
        }
      });
      return next.handle(cloned);
    }

    // if not logged in, just pass the request
    return next.handle(request);
  }
}
