import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildAssistantModule } from './components/build-assistant/build-assistant.module';
import { HomeModule } from './components/home/home.module';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BungieApiService } from './services/bungie-api.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginCallbackComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BuildAssistantModule,
    HomeModule,
    BuildAssistantModule,
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
