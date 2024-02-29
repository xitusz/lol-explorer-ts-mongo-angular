import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { IRegion } from '../../interfaces/region.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionDetailsService } from '../../services/region-details.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-region-details',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './region-details.component.html',
  styleUrl: './region-details.component.css',
})
export class RegionDetailsComponent implements OnInit {
  regionDetails: IRegion = {
    name: '',
    nameBR: '',
    img: '',
    regionVideo: '',
    icon: '',
    description: '',
    champions: [],
  };
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private regionDetailsService: RegionDetailsService
  ) {}

  ngOnInit(): void {
    this.fetchRegionDetails();
  }

  fetchRegionDetails(): void {
    const regionName: string | null = this.route.snapshot.params['regionName'];
    if (!regionName) return;

    this.regionDetailsService.getRegionByName(regionName).subscribe((region) => {
      if (!region) {
        this.loading = true;
        return;
      }
      this.regionDetails = region;
      this.loading = false;
    });
  }

  navigateToChampion(championId: string): void {
    this.router.navigate([`champion/${championId}`]);
  }
}
