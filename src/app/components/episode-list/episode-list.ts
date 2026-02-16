import { ChangeDetectorRef, Component } from '@angular/core';
import { EpisodeCard } from '../episode-card/episode-card';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PaginatedResponse, SimpsonsEpisode } from '../../models/simpsons.model';
import { SimpsonsApi } from '../../services/simpsons-api';
import { SearchService } from '../../services/search.service';

/*Pide los episodios a la API
- Escucha el buscador
- Filtra los resultados
- Controla la paginación
- Navega al detalle*/
@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [EpisodeCard],
  templateUrl: './episode-list.html',
  styleUrl: './episode-list.css'
})
export class EpisodeList {

  page = 1; // Guarda la pag actual

  // Se guarda la respuesta de la API. null = no hay datos todavia
  data: PaginatedResponse<SimpsonsEpisode> | null = null;

  // Episodios filtrados.
  filtered: SimpsonsEpisode[] = [];

  loading = false;
  errorMsg = '';


  private sub?: Subscription; // Escucha a la Api
  private searchSub?: Subscription; // Escucha al Buscador

  /*
  - SimpsonsApi	Pedir episodios
  - Router	Navegar
  - ChangeDetectorRef	Forzar actualización
  - SearchService	Escuchar búsqueda
  */
  constructor(
    public api: SimpsonsApi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private search: SearchService
  ) { }

  /*
  Cuando el componente se crea:
  1. Llama a la API
  2️. Se suscribe al buscador
  Cada vez que cambie el texto del Header se ejecuta applyFilter(term)*/
  ngOnInit() {
    this.loadData();

    this.searchSub = this.search.term$.subscribe(term => {
      this.applyFilter(term);
    });
  }

  // Cancela las suscripciones.
  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.searchSub?.unsubscribe();
  }

  // Llama a la API, Guarda los datos originales y muestra todos (sin filtro inicialmente)
  loadData() {
    this.loading = true;
    this.sub?.unsubscribe();

    this.sub = this.api.getEpisodes(this.page).subscribe({
      next: data => {
        this.data = data;
        this.filtered = data.results;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMsg = err?.message ?? 'Error';
        this.loading = false;
      }
    });
  }

  /*
  Toma los datos originales
  Filtra por nombre
  Actualiza filtered
  */
  applyFilter(term: string) {
    if (!this.data) return;

    // COnvierte a minusculas y giltra los resultados
    const t = term.toLowerCase();
    this.filtered = this.data.results.filter(e =>
      e.name.toLowerCase().includes(t)
    );
  }
  // Si episodio seleccionado, navega al detalle
  onEpisodeSelected(id: number) {
    this.router.navigate(['/episode', id]);
  }

  next() { this.page++; this.loadData(); }
  prev() { if (this.page > 1) { this.page--; this.loadData(); } }
}
