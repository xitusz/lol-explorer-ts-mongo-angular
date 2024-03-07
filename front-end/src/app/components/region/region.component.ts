import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { IRegion, IRegionList } from '../../interfaces/region.interface';
import { RegionService } from '../../services/region.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './region.component.html',
  styleUrl: './region.component.css',
})
export class RegionComponent implements OnInit {
  regions: IRegionList = {};
  loading: boolean = true;
  searchRegion: string = '';

  constructor(
    private router: Router,
    private regionService: RegionService
  ) {}

  ngOnInit(): void {
    this.fetchRegions();
  }

  fetchRegions(): void {
    this.regionService.getRegions().subscribe((region) => {
      this.regions = region;
      this.loading = false;
    });
  }

  handleSearch(event: Event): void {
    this.searchRegion = (event.currentTarget as HTMLInputElement).value;
  }

  normalizedString(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  filteredRegions(): IRegion[] {
    return Object.values(this.regions).filter(({ nameBR }) => {
      const normalizedSearch = this.normalizedString(this.searchRegion);
      const normalizedRegion = this.normalizedString(nameBR);

      return normalizedRegion.includes(normalizedSearch);
    });
  }

  sortedRegions(): IRegion[] {
    return this.filteredRegions().sort((a, b) => a.nameBR.localeCompare(b.nameBR));
  }

  navigateToRegion(regionName: string): void {
    this.router.navigate([`region/${regionName}`]);
  }
}
