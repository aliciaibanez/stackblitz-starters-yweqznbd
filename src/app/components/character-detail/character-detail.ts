import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { SimpsonsCharacter } from '../../models/simpsons.model';
import { SimpsonsApi } from '../../services/simpsons-api';
@Component({
  selector: 'app-character-detail',
  imports: [RouterLink],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.css',
  standalone: true,
})
export class CharacterDetail {
  character: SimpsonsCharacter | null = null;
  loading = false;
  errorMsg = '';
  private sub?: Subscription;
  constructor(
    private route: ActivatedRoute,
    public api: SimpsonsApi,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sub = this.api.getCharacterById(id).subscribe({
      next: (c) => {
        this.character = c;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err?.message ?? 'Error cargando detalle';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  portraitUrl(path: string | null) {
    return this.api.portraitUrl(path);
  }
}
