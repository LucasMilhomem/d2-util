import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const stored = localStorage.getItem('auth');
    const tokenData = stored ? JSON.parse(stored) : null;

    if (tokenData && tokenData.access_token && Date.now() < tokenData.expires_at) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenData.access_token}`,
          'X-API-Key': environment.bungie_api_key,
        }
      });
      return next.handle(cloned);
    }

    // Caso não tenha token válido, envia a requisição original mesmo assim
    return next.handle(request);
  }
}
