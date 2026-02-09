import { ChangeDetectorRef, Component } from '@angular/core';
import { EpisodeCard } from '../episode-card/episode-card';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  PaginatedResponse,
  SimpsonsEpisode
} from '../../models/simpsons.model';

import { SimpsonsApi } from '../../services/simpsons-api';

@Component({
 selector: 'app-episode-list',
 standalone: true,
 imports: [EpisodeCard],
 templateUrl: './episode-list.html',
 styleUrl: './episode-list.css',
})
export class EpisodeList {

 page: number = 1;

 data: PaginatedResponse<SimpsonsEpisode> | null = null;

 loading: boolean = false;
 errorMsg: string = '';

 private sub?: Subscription;

 constructor(
   public api: SimpsonsApi,
   private router: Router,
   private cdr: ChangeDetectorRef
 ) {}

 ngOnInit() {
   this.loadData();
 }

 ngOnDestroy() {
   this.sub?.unsubscribe();
 }

 loadData() {
   this.loading = true;
   this.errorMsg = '';

   this.sub?.unsubscribe();

   this.sub = this.api.getEpisodes(this.page).subscribe({
     next: (data) => {
       this.data = data;
       this.loading = false;
       this.cdr.detectChanges();
     },
     error: (err) => {
       this.errorMsg = err?.message ?? 'Error cargando episodios';
       this.loading = false;
       this.cdr.detectChanges();
     },
   });
 }

 // click en card → navegar a detalle episodio
 onEpisodeSelected($event: any) {
   this.router.navigate(['/episode', $event]);
 }

 next() {
   this.page++;
   this.loadData();
   this.cdr.detectChanges();
 }

 prev() {
   if (this.page > 1) {
     this.page--;
     this.loadData();
     this.cdr.detectChanges();
   }
 }
}
