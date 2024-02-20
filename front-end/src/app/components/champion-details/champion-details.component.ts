import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-champion-details',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './champion-details.component.html',
  styleUrl: './champion-details.component.css'
})
export class ChampionDetailsComponent {

}
