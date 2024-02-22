import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChampionComponent } from './components/champion/champion.component';
import { ChampionDetailsComponent } from './components/champion-details/champion-details.component';
import { RegionComponent } from './components/region/region.component';
import { RegionDetailsComponent } from './components/region-details/region-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'champion', component: ChampionComponent },
  { path: 'champion/:championName', component: ChampionDetailsComponent },
  { path: 'region', component: RegionComponent },
  { path: 'region/:regionName', component: RegionDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
];
