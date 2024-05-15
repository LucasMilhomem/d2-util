import { Route } from '@angular/router';
import { BungieService } from './service/bungie-service.service';
import { HomeComponent } from './view/home/home.component';
export const routes: Route[] = [
    {
        path: '',
        providers: [
            BungieService,
        ],
        component:  HomeComponent,
    },
];