import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { FavoriteService } from '../../services/favorite.service';
import { IProfile } from '../../interfaces/profile.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FooterComponent, CommonModule, RouterLink],
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

    this.fetchUserInfo();
    this.fetchFavorites();
  }

  fetchUserInfo(): void {
    this.profileService.getProfile(this.token).subscribe((profile) => {
      this.profileInfo = profile;
    });
  }

  fetchFavorites(): void {
    if (this.isLoggedIn && this.token) {
      this.favoriteService.getFavorites(this.token).subscribe((favorites) => {
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
