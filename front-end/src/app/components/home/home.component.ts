import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  championsImg: string = '../../../assets/images/champions.png';
  regionsImg: string = '../../../assets/images/regions.png';
}
