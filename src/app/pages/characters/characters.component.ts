import { Component, OnInit } from '@angular/core';

import { CharactersService } from 'src/app/services/characters/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.less'],
})
export class CharactersComponent implements OnInit {
  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {}
}
