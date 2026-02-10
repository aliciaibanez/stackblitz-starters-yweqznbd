import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; // Personajes / Episodios
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-header',
  standalone: true,

  // Importamos los módulos nuevos
  imports: [
    RouterLink,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {}
