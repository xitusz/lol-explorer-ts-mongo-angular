import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { FavoriteService } from '../../services/favorite.service';
import { IProfile } from '../../interfaces/profile.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileInfo: IProfile = {
    name: '',
    email: '',
  };
  showFavorites: boolean = true;
  favorites: string[] = [];
  token: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token') || '';
      this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
    }

    this.fetchUserInfo(this.token);
    this.fetchFavorites(this.token);
  }

  fetchUserInfo(token: string) {
    this.profileService.getProfile(token).subscribe((profile) => {
      this.profileInfo = profile;
    });
  }

  fetchFavorites(token: string) {
    if (this.isLoggedIn && token) {
      this.favoriteService.getFavorites(token).subscribe((favorites) => {
        this.favorites = favorites.sort();
      });
    }
  }

  navigateToChampion(championId: string): void {
    this.router.navigate([`champion/${championId}`]);
  }

  toggleShowFavorites(): void {
    this.showFavorites = !this.showFavorites;
  }
}
