import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { IChampionDetails, ISkillVideos } from '../../interfaces/champion-details.interface';
import { ChampionDetailsService } from '../../services/champion-details.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-champion-details',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './champion-details.component.html',
  styleUrl: './champion-details.component.css',
})
export class ChampionDetailsComponent implements OnInit {
  @ViewChild('championVideo') championVideo!: ElementRef;

  championDetails: IChampionDetails[] | undefined;
  loading: boolean = true;
  skillState: string = 'P';
  skinState: string = 'default';
  skillVideos: ISkillVideos = {};
  skillOrder: string[] = ['Q', 'W', 'E', 'R'];

  constructor(
    private route: ActivatedRoute,
    private championService: ChampionDetailsService
  ) {}

  ngOnInit(): void {
    this.fetchChampionDetails();
    this.fetchSkillVideos();
  }

  fetchChampionDetails(): void {
    const championName: string | null = this.route.snapshot.params['championName'];
    if (!championName) return;
    this.championService.getChampionDetails(championName).subscribe((championDetails) => {
      this.championDetails = Object.values(championDetails);
      this.loading = false;
    });
  }

  fetchSkillVideos(): void {
    this.championService.getSkillVideos().subscribe((videos) => {
      this.skillVideos = videos;
    });
  }

  setSkillState(skill: string): void {
    this.skillState = skill;
    this.updateVideo();
  }

  setSkinState(skin: string): void {
    this.skinState = skin;
  }

  updateVideo(): void {
    if (this.championVideo) {
      const video: HTMLVideoElement = this.championVideo.nativeElement;
      video.load();
      video.play();
    }
  }
}
