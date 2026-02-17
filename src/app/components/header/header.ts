// Imports necesarios para que el componente funcione

// Crear componente con Angular
import { Component } from '@angular/core';

//Navegar entre páginas:
// Router: Para saber en qué pagina estamos.
// RouterLink: Crear enlaces a otras páginas
import { Router, RouterLink } from '@angular/router';

// Para el buscador. Permite usar formularios y campos de texto.
import { FormsModule } from '@angular/forms';

// Componentes de Angular material para el diseño
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// Importa un servicio de búsqueda. Sirve para guardar el texto que el usuario busca.
import { SearchService } from '../../services/search.service';


// Decorador para declarar un componente.
@Component({
  selector: 'app-header',

  // No necesita estar dentro de ningún módulo.
  standalone: true,

  // Imports que el componente puede utilizar.
  imports: [
    RouterLink,
    FormsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],

  // Direccion del header + css del header
  templateUrl: './header.html',
  styleUrl: './header.css'
})

// Clase header. La logica.
export class Header {

  // Guarda el texto que el usuario busca en el buscador.
  searchText = '';

  // El constructor recibe:
  // Router para saber en qué página estás
  // SearchService para comunicar la búsqueda
  constructor(
    public router: Router,
    public search: SearchService
  ) { }

  // Cuando se pulsa Buscar, se envía el texto al searchservice y el servicio avisa a los demás componentes
  onSearch() {
    this.search.setTerm(this.searchText);
  }

  // Limpia la búsqueda
  clearSearch() {
    this.searchText = '';
    this.search.clear();
  }

  // Mostrar el buscador solo en personajes y episodios
  showSearch(): boolean {
    return this.router.url === '/characters' || this.router.url === '/episodes';
  }
}
