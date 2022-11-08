import { Component, OnInit } from '@angular/core';
import { IHero } from '../types/hero';
import { HEROES } from '../mock-data/mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes = HEROES;

  selectedHero?: IHero;
  onSelect(hero: IHero): void {
    this.selectedHero = hero;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
