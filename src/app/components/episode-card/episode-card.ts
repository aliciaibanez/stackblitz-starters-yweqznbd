import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

// Mismo que character-card pero adaptado
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
 @Input() episode!: number;
 @Input() image!: string | null;
 @Input() air_date!: string | null;

 @Output() episodeSelected = new EventEmitter<number>();

 onClick() {
   this.episodeSelected.emit(this.id);
 }
}
