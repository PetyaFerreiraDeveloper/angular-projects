import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IHero } from './types/hero';
import { HEROES } from './mock-data/mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to the console instead

      // TODO: better job of trasnforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // let the app keep running by retruning an empty result
      return of(result as T);
    }
  }

  getHeroes(): Observable<IHero[]> {
    return this.http
      .get<IHero[]>(this.heroesUrl)
      .pipe(catchError(this.handleError<IHero[]>('get heroes', [])));
  }

  getHero(id: number): Observable<IHero> {
    const hero = HEROES.find((h) => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
