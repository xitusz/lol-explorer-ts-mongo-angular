import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChampionComponent } from './components/champion/champion.component';
import { ChampionDetailsComponent } from './components/champion-details/champion-details.component';
import { RegionComponent } from './components/region/region.component';
import { RegionDetailsComponent } from './components/region-details/region-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { authGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/not-auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'champion', component: ChampionComponent },
  { path: 'champion/:championName', component: ChampionDetailsComponent },
  { path: 'region', component: RegionComponent },
  { path: 'region/:regionName', component: RegionDetailsComponent },
  { path: 'login', component: LoginComponent, canActivate: [notAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [notAuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [authGuard] },
];
