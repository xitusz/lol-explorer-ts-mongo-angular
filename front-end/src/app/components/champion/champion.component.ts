import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-champion',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './champion.component.html',
  styleUrl: './champion.component.css'
})
export class ChampionComponent {

}
