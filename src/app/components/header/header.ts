import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  searchText = '';

  constructor(
    public router: Router,
    private search: SearchService
  ) {}

  onSearch() {
    this.search.setTerm(this.searchText);
  }

  clearSearch() {
    this.searchText = '';
    this.search.clear();
  }

  showSearch(): boolean {
    return this.router.url === '/characters' || this.router.url === '/episodes';
  }
}
