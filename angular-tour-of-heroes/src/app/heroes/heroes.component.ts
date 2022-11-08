import { Component, OnInit } from '@angular/core';
import { IHero } from '../types/hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: IHero[] = [];

  selectedHero?: IHero;
  onSelect(hero: IHero): void {
    this.selectedHero = hero;
  }

  constructor(private heroService: HeroService) { }

  getHeroes() : void {
    this.heroService.getHeroes() 
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }


}
