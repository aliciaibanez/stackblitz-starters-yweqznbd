import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private termSubject = new BehaviorSubject<string>('');

  term$: Observable<string> = this.termSubject.asObservable();

  setTerm(term: string) {
    this.termSubject.next(term);
  }

  clear() {
    this.termSubject.next('');
  }
}
