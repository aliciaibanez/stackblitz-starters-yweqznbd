import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { SimpsonsEpisode } from '../../models/simpsons.model';
import { SimpsonsApi } from '../../services/simpsons-api';

@Component({
 selector: 'app-episode-detail',
 standalone: true,
 imports: [RouterLink],
 templateUrl: './episode-detail.html',
 styleUrl: './episode-detail.css',
})
export class EpisodeDetail {

 episode: SimpsonsEpisode | null = null;

 loading = false;
 errorMsg = '';

 private sub?: Subscription;

 constructor(
   private route: ActivatedRoute,
   public api: SimpsonsApi,
   private cdr: ChangeDetectorRef
 ) {}

 ngOnInit(): void {
   this.loading = true;

   const id = Number(this.route.snapshot.paramMap.get('id'));

   this.sub = this.api.getEpisodeById(id).subscribe({
     next: (e) => {
       this.episode = e;
       this.loading = false;
       this.cdr.detectChanges();
     },
     error: (err) => {
       this.errorMsg = err?.message ?? 'Error cargando episodio';
       this.loading = false;
       this.cdr.detectChanges();
     },
   });
 }

 ngOnDestroy(): void {
   this.sub?.unsubscribe();
 }
 imageUrl(path: string | null) {
  return this.api.episodeImageUrl(path);
}

}
