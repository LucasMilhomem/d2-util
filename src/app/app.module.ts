import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildViewerModule } from './components/build-viewer/build-viewer.module';
import { HomeComponent } from './components/home/home.component';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BungieApiService } from './services/bungie-api.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginCallbackComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BuildViewerModule,
  ],
  providers: [
    BungieApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
