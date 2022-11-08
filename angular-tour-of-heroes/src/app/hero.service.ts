import { Injectable } from '@angular/core';
import { IHero } from './types/hero';
import { HEROES } from './mock-data/mock-heroes';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): Observable<IHero[]> {
    const heroes = of(HEROES);
    return heroes;
  }
}
