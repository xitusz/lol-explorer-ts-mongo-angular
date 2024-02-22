import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { IChampion } from '../../interfaces/champion.interface';
import { ChampionService } from '../../services/champion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-champion',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './champion.component.html',
  styleUrl: './champion.component.css',
})
export class ChampionComponent implements OnInit {
  champions: IChampion[] = [];
  loading: boolean = true;
  searchChampion: string = '';
  filterTypes: string[] = [];
  showFavorites: boolean = false;
  favorites: string[] = [];

  championTypes = [
    { label: 'Todos', value: 'All' },
    { label: 'Assassinos', value: 'Assassin' },
    { label: 'Magos', value: 'Mage' },
    { label: 'Tanques', value: 'Tank' },
    { label: 'Lutadores', value: 'Fighter' },
    { label: 'Atiradores', value: 'Marksman' },
    { label: 'Suportes', value: 'Support' },
  ];

  constructor(
    private router: Router,
    private championService: ChampionService
  ) {}

  ngOnInit(): void {
    this.fetchChampions();
  }

  fetchChampions(): void {
    this.championService.getChampions().subscribe((champions) => {
      this.champions = Object.values(champions);
      this.loading = false;
    });
  }

  handleSearch(event: Event): void {
    this.searchChampion = (event.currentTarget as HTMLInputElement).value;
  }

  handleFilterTypes(type: string): void {
    if (type === 'All') {
      this.filterTypes = [];
    } else {
      if (this.filterTypes.includes(type)) {
        this.filterTypes = this.filterTypes.filter((item) => item !== type);
      } else {
        this.filterTypes.push(type);
      }
    }
  }

  filteredChampions(): IChampion[] {
    let displayedChampions = this.champions.filter(({ name, tags }) => {
      const isMatch = name.toLowerCase().includes(this.searchChampion.toLowerCase());
      const hasSelectedTypes = this.filterTypes.length > 0 ? this.filterTypes.every((type) => tags.includes(type)) : true;
      return isMatch && hasSelectedTypes;
    });

    if (this.showFavorites) {
      displayedChampions = displayedChampions.filter((champion) => this.favorites.includes(champion.id));
    }

    return displayedChampions;
  }

  navigateToChampion(championId: string): void {
    this.router.navigate([`champion/${championId}`]);
  }

  toggleShowFavorites(): void {
    this.showFavorites = !this.showFavorites;
  }

  isFavorite(championId: string): boolean {
    return this.favorites.includes(championId);
  }

  handleFavorite(championId: string): void {
    if (localStorage.getItem('isLoggedIn')) {
      if (this.isFavorite(championId)) {
        this.favorites = this.favorites.filter((id) => id !== championId);
      } else {
        this.favorites.push(championId);
      }
    } else {
      alert('Você precisa estar conectado para favoritar um campeão.');
    }
  }

  clearFavorites(): void {
    this.favorites = [];
  }
}
