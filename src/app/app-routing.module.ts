import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';
import { HomeComponent } from './components/home/home.component';
import { BuildViewerComponent } from './components/build-viewer/build-viewer.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '',  redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'build-viewer', component: BuildViewerComponent , canActivate: [AuthGuard]},
  { path: 'auth/callback', component: LoginCallbackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
