import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SimpsonsApi } from '../../services/simpsons-api';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './episode-card.html',
  styleUrl: './episode-card.css',
})
export class EpisodeCard {

  @Input() id: number = 0;
  @Input() name!: string;
  @Input() season!: number;
  @Input() episode_number!: number;
  @Input() airdate!: string | null;
  @Input() image_path!: string | null;

  @Output() episodeSelected = new EventEmitter<number>();

  constructor(public api: SimpsonsApi) {}

  imageUrl(path: string | null) {
    return this.api.episodeImageUrl(path);
  }

  onClick() {
    this.episodeSelected.emit(this.id);
  }
}
