// Component define el componente
// ChangeDetectorRef permite forzar manualmente la actualización de la vista
import { ChangeDetectorRef, Component } from '@angular/core';

// Componente que representa cada tarjeta de episodio
import { EpisodeCard } from '../episode-card/episode-card';

// Router permite navegar entre rutas
import { Router } from '@angular/router';

// Subscription para gestionar y cancelar suscripciones a Observables
import { Subscription } from 'rxjs';

// PaginatedResponse estructura de respuesta paginada de la API
// SimpsonsEpisode estructura de un episodio
import { PaginatedResponse, SimpsonsEpisode } from '../../models/simpsons.model';

// Servicio que hace las peticiones HTTP a la API
import { SimpsonsApi } from '../../services/simpsons-api';

// Servicio que gestiona el texto de búsqueda compartido (Header -Lista)
import { SearchService } from '../../services/search.service';


/*
Este componente:
- Pide los episodios a la API
- Escucha el buscador
- Filtra los resultados
- Controla la paginación
- Navega al detalle
*/
@Component({
  selector: 'app-episode-list', // Selector HTML
  standalone: true,              // Componente standalone
  imports: [EpisodeCard],        // Importa el componente hijo
  templateUrl: './episode-list.html', // HTML asociado
  styleUrl: './episode-list.css'      // CSS asociado
})
export class EpisodeList {

  // Página actual para la paginación
  page = 1;

  // Guarda la respuesta completa de la API
  // null significa que todavía no se han cargado datos
  data: PaginatedResponse<SimpsonsEpisode> | null = null;

  // Array de episodios que se muestran en pantalla (pueden estar filtrados)
  filtered: SimpsonsEpisode[] = [];

  // Control de estado de carga
  loading = false;

  // Mensaje de error en caso de fallo
  errorMsg = '';

  // Suscripción a la API
  private sub?: Subscription;

  // Suscripción al buscador (Header)
  private searchSub?: Subscription;

  /*
  Inyección de dependencias:
  - SimpsonsApi para pedir episodios
  - Router para navegar al detalle
  - ChangeDetectorRef para forzar actualización
  - SearchService para escuchar cambios del buscador
  */
  constructor(
    public api: SimpsonsApi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private search: SearchService
  ) { }

  /*
  Cuando el componente se inicializa:
  1. Carga los episodios desde la API
  2. Se suscribe al buscador (term$ es un Observable)
  Cada vez que cambie el texto del Header se ejecuta applyFilter(term)
  */
  ngOnInit() {

    // Carga inicial de datos
    this.loadData();

    // Escucha los cambios del buscador
    this.searchSub = this.search.term$.subscribe(term => {
      this.applyFilter(term);
    });
  }

  // Cuando el componente se destruye
  // Se cancelan las suscripciones
  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.searchSub?.unsubscribe();
  }

  /*
  loadData():
  - Activa estado de carga
  - Llama a la API según la página actual
  - Guarda los datos originales
  - Inicialmente muestra todos los episodios (sin filtro)
  */
  loadData() {

    this.loading = true;

    // Si había una suscripción anterior, la cancelamos
    this.sub?.unsubscribe();

    // Llamada a la API
    this.sub = this.api.getEpisodes(this.page).subscribe({

      // Si la petición es correcta
      next: data => {
        this.data = data;               // Guardamos respuesta completa
        this.filtered = data.results;   // Mostramos todos inicialmente
        this.loading = false;           // Quitamos estado de carga
        this.cdr.detectChanges();       // Forzamos actualización visual
      },

      // Si hay error
      error: err => {
        this.errorMsg = err?.message ?? 'Error';
        this.loading = false;
      }
    });
  }

  /*
  applyFilter(term):
  - Usa los datos originales (data.results)
  - Filtra por nombre del episodio
  - Actualiza el array filtered (lo que se muestra en pantalla)
  */
  applyFilter(term: string) {

    // Si todavía no hay datos, no hace nada
    if (!this.data) return;

    // Convierte el término a minúsculas para evitar problemas de mayúsculas
    const t = term.toLowerCase();

    // Filtra los episodios cuyo nombre incluya el texto buscado
    this.filtered = this.data.results.filter(e =>
      e.name.toLowerCase().includes(t)
    );
  }

  /*
  Cuando se selecciona un episodio:
  - Navega a la ruta /episode/:id
  */
  onEpisodeSelected(id: number) {
    this.router.navigate(['/episode', id]);
  }

  // Ir a la siguiente página y recargar datos
  next() {
    this.page++;
    this.loadData();
  }

  // Ir a la página anterior (si no estamos en la 1)
  prev() {
    if (this.page > 1) {
      this.page--;
      this.loadData();
    }
  }
}
