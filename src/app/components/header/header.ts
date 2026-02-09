import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; // Personajes / Episodios
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-header',
  standalone: true,

  // Importamos los módulos nuevos
  imports: [
    RouterLink,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {}
