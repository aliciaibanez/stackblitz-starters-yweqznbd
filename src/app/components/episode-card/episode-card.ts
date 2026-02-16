// Importa cosas básicas de Angular:
// - Component: para crear un componente
// - Input: para recibir datos del componente padre
// - Output: para enviar eventos al padre
// - EventEmitter: para emitir esos eventos
import { Component, EventEmitter, Input, Output } from '@angular/core';

// Importa el módulo de Angular Material que permite usar <mat-card>
import { MatCardModule } from '@angular/material/card';

// Importa el servicio que se encarga de generar la URL correcta de las imágenes
// Este servicio viene de la carpeta services
import { SimpsonsApi } from '../../services/simpsons-api';


// Decorador que define el componente
@Component({

  selector: 'app-episode-card',

  standalone: true,

  imports: [MatCardModule],

  // Archivo HTML asociado a este componente
  templateUrl: './episode-card.html',

  // Archivo CSS asociado
  styleUrl: './episode-card.css',
})
export class EpisodeCard {


  // DATOS QUE VIENEN DEL PADRE
  // Estos valores los recibe desde EpisodeList
  // En el padre se pasan así:
  // [id]="e.id", [name]="e.name", etc.

  @Input() id: number = 0;
  // Identificador del episodio (se usará para navegar)

  @Input() name!: string;
  // Nombre del episodio (viene de la API - EpisodeList - aquí)

  @Input() season!: number;
  // Número de temporada

  @Input() episode_number!: number;
  // Número de episodio dentro de la temporada

  @Input() airdate!: string | null;
  // Fecha de emisión (puede ser null si no existe)

  @Input() image_path!: string | null;
  // Ruta parcial de la imagen (ej: "/episode/123.webp")
  // NO es la URL completa


  // EVENTO QUE SE ENVÍA AL PADRE
  @Output() episodeSelected = new EventEmitter<number>();
  // Este componente puede emitir un evento llamado "episodeSelected"
  // Enviará un número (el id del episodio)
  // El padre lo escucha así:
  // (episodeSelected)="onEpisodeSelected($event)"



  // CONSTRUCTOR
  constructor(public api: SimpsonsApi) { }
  // Angular inyecta el servicio SimpsonsApi.
  // Lo usamos para generar la URL completa de la imagen.


  // MÉTODO PARA GENERAR LA URL
  imageUrl(path: string | null) {
    // Llama al servicio para convertir la ruta parcial
    // en una URL completa del CDN.
    return this.api.episodeImageUrl(path);
  }


  // MÉTODO QUE SE EJECUTA AL HACER CLICK
  onClick() {
    // Cuando se hace click en la tarjeta:
    // 1. Se emite el evento
    // 2. Se envía el id al componente padre
    this.episodeSelected.emit(this.id);
  }
}
