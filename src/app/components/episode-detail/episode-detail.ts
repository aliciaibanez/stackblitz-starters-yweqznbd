
// Component permite definir un componente
// ChangeDetectorRef permite forzar manualmente la actualización de la vista
import { ChangeDetectorRef, Component } from '@angular/core';

// ActivatedRoute permite acceder a parámetros de la URL
// RouterLink se usa para navegación en el HTML
import { ActivatedRoute, RouterLink } from '@angular/router';

// Subscription permite gestionar y cancelar suscripciones a Observables
import { Subscription } from 'rxjs';

// Importamos el modelo que define la estructura de un episodio
import { SimpsonsEpisode } from '../../models/simpsons.model';

// Importamos el servicio que hace las llamadas a la API
import { SimpsonsApi } from '../../services/simpsons-api';


// Decorador que define la configuración del componente
@Component({
  selector: 'app-episode-detail',   // Nombre del selector HTML
  standalone: true,                  // Es un componente standalone (no necesita módulo)
  imports: [RouterLink],             // Importamos RouterLink porque lo usamos en el HTML
  templateUrl: './episode-detail.html',  // Archivo HTML asociado
  styleUrl: './episode-detail.css',      // Archivo CSS asociado
})

// Clase del componente
export class EpisodeDetail {

  // Variable que almacenará el episodio recibido de la API
  // Puede ser null al principio (antes de cargar los datos)
  episode: SimpsonsEpisode | null = null;

  // Variable que controla si los datos están cargando
  loading = false;

  // Variable para almacenar un posible mensaje de error
  errorMsg = '';

  // Suscripción a la llamada HTTP
  // Se guarda para poder cancelarla cuando el componente se destruya
  private sub?: Subscription;

  // Constructor donde inyectamos dependencias
  constructor(
    private route: ActivatedRoute, // Para leer el parámetro "id" de la URL
    public api: SimpsonsApi,       // Servicio que hace la petición a la API
    private cdr: ChangeDetectorRef // Para forzar actualización de la vista
  ) { }

  // Método que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {

    // Activamos el estado de carga
    this.loading = true;

    // Obtenemos el parámetro "id" de la URL y lo convertimos a número
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Llamamos al servicio para obtener el episodio por ID
    // Nos suscribimos al Observable que devuelve la API
    this.sub = this.api.getEpisodeById(id).subscribe({

      // Si la petición tiene éxito
      next: (e) => {
        this.episode = e;      // Guardamos el episodio recibido
        this.loading = false;  // Quitamos el estado de carga
        this.cdr.detectChanges(); // Forzamos actualización de la vista
      },

      // Si ocurre un error
      error: (err) => {
        // Guardamos el mensaje de error (si existe)
        // Si no existe, mostramos un mensaje por defecto
        this.errorMsg = err?.message ?? 'Error cargando episodio';
        this.loading = false;  // Quitamos el estado de carga
        this.cdr.detectChanges(); // Forzamos actualización de la vista
      },
    });
  }

  // Método que se ejecuta cuando el componente se destruye
  ngOnDestroy(): void {
    this.sub?.unsubscribe(); // Cancelamos la suscripción si existe
  }

  // Método auxiliar para generar la URL completa de la imagen
  imageUrl(path: string | null) {
    return this.api.episodeImageUrl(path);
  }

}
