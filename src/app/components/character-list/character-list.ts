import { ChangeDetectorRef, Component } from '@angular/core';
import { CharacterCard } from '../character-card/character-card';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PaginatedResponse, SimpsonsCharacter } from '../../models/simpsons.model';
import { SimpsonsApi } from '../../services/simpsons-api';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CharacterCard],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css'
})
export class CharacterList {

  page = 1;
  data: PaginatedResponse<SimpsonsCharacter> | null = null;
  filtered: SimpsonsCharacter[] = [];

  loading = false;
  errorMsg = '';

  private sub?: Subscription;
  private searchSub?: Subscription;

  constructor(
    public api: SimpsonsApi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private search: SearchService
  ) { }

  ngOnInit() {
    this.loadData();

    this.searchSub = this.search.term$.subscribe(term => {
      this.applyFilter(term);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.searchSub?.unsubscribe();
  }

  loadData() {
    this.loading = true;
    this.sub?.unsubscribe();

    this.sub = this.api.getCharacters(this.page).subscribe({
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

  applyFilter(term: string) {
    if (!this.data) return;

    const t = term.toLowerCase();
    this.filtered = this.data.results.filter(c =>
      c.name.toLowerCase().includes(t)
    );
  }

  onCharacterSelected(id: number) {
    this.router.navigate(['/character', id]);
  }

  portraitUrl(p: string | null) {
    return this.api.portraitUrl(p);
  }

  next() { this.page++; this.loadData(); }
  prev() { if (this.page > 1) { this.page--; this.loadData(); } }
}
