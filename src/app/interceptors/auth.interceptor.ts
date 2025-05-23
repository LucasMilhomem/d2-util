import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn()) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`,
          'X-API-Key': environment.bungie_api_key,
        }
      });
      return next.handle(cloned);
    }

    // Caso não tenha token válido, envia a requisição original mesmo assim
    return next.handle(request);
  }
}
