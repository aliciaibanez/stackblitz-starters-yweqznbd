import { ChangeDetectorRef, Component } from '@angular/core';
import { EpisodeCard } from '../episode-card/episode-card';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PaginatedResponse, SimpsonsEpisode } from '../../models/simpsons.model';
import { SimpsonsApi } from '../../services/simpsons-api';
import { SearchService } from '../../services/search.service';

@Component({
 selector: 'app-episode-list',
 standalone: true,
 imports: [EpisodeCard],
 templateUrl: './episode-list.html',
 styleUrl: './episode-list.css'
})
export class EpisodeList {

 page = 1;
 data: PaginatedResponse<SimpsonsEpisode> | null = null;
 filtered: SimpsonsEpisode[] = [];

 loading = false;
 errorMsg = '';

 private sub?: Subscription;
 private searchSub?: Subscription;

 constructor(
   public api: SimpsonsApi,
   private router: Router,
   private cdr: ChangeDetectorRef,
   private search: SearchService
 ) {}

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

 applyFilter(term: string) {
   if (!this.data) return;

   const t = term.toLowerCase();
   this.filtered = this.data.results.filter(e =>
     e.name.toLowerCase().includes(t)
   );
 }

 onEpisodeSelected(id:number){
   this.router.navigate(['/episode', id]);
 }

 next(){ this.page++; this.loadData(); }
 prev(){ if(this.page>1){ this.page--; this.loadData(); }}
}
