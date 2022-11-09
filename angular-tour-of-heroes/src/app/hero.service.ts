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
    return this.http.get<IHero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<IHero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IHero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<IHero>(`getHero id=${id}`))
      );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: IHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  /** POST: add a new hero to the server */

  addHero(hero: IHero): Observable<IHero> {
    return this.http.post<IHero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: IHero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<IHero>('addHero'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<IHero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<IHero>('deleteHero'))
      );
  }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
