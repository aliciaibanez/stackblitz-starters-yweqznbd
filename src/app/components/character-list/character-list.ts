import { ChangeDetectorRef, Component } from '@angular/core';
import { CharacterCard } from '../character-card/character-card';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginatedResponse, SimpsonsCharacter } from '../../models/simpsons.model';
import { SimpsonsApi } from '../../services/simpsons-api';
@Component({
 selector: 'app-character-list',
 imports: [CharacterCard],
 templateUrl: './character-list.html',
 styleUrl: './character-list.css',
 standalone: true,
})
export class CharacterList {
 page: number = 1;
 data: PaginatedResponse<SimpsonsCharacter> | null = null;
 loading: boolean = false;
 errorMsg: string = '';
 private sub?: Subscription;
 constructor(public api: SimpsonsApi, private router: Router, private cdr:
ChangeDetectorRef) {}
 ngOnInit() {
 this.loadData();
 }
 ngOnDestroy() {
 this.sub?.unsubscribe();
 }
 loadData() {
 this.loading = true;
 this.errorMsg = '';
 // Cancelamos la suscripción anterior si existía
 this.sub?.unsubscribe();
 this.sub = this.api.getCharacters(this.page).subscribe({
 next: (data) => {
 this.data = data;
 this.loading = false;
 this.cdr.detectChanges();
 },
 error: (err) => {
 this.errorMsg = err?.message ?? 'Error cargando personajes';
 this.loading = false;
 this.cdr.detectChanges();
 },
});
 }
 // cuando se da click para ver el personaje se va a esa ruta y la envia el ID del personaje
onCharacterSelected($event: any) {
  this.router.navigate(['/character', $event]);
  }
  portraitUrl(path: string | null) {
  return this.api.portraitUrl(path);
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