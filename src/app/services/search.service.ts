// Injectable = Esta clase es un servicio que puede utilizarse en otros sitios
import { Injectable } from '@angular/core';
//BS guarda dato + avisa cuando cambia
// Obs permite escuchar cambios
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Clase SearchService:

/*Header escribe texto
     -
SearchService lo guarda
     -
Characters escucha cambios
     -
Se actualiza automáticamente*/
export class SearchService {

  // Crea un BS de tipo string. Inicializado vacío
  private termSubject = new BehaviorSubject<string>('');

  /*term$ es un Observable.
  -Solo permite escuchar cambios
  -No permite modificar el valor directamente
  -Solo el servicio puede cambiar el valor (con next())
  -Los componentes solo pueden escuchar
  */
  term$: Observable<string> = this.termSubject.asObservable();

  // Método setTerm: 
  /*Usuario escribe "Lisa"
  → setTerm("Lisa")
  → termSubject cambia
  → todos los componentes suscritos reciben "Lisa"*/
  setTerm(term: string) {
    this.termSubject.next(term);
  }

  // Método clear: Hace lo mismo que setTerm, pero pone el valor vacío.
  clear() {
    this.termSubject.next('');
  }
}
