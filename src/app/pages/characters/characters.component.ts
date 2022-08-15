import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { CharactersService } from 'src/app/services/characters/characters.service';

export interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
  };
}

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.less'],
})
export class CharactersComponent implements OnInit {
  public loadingCharacters = false;
  public characters!: any;

  constructor(
    private charactersService: CharactersService,
    private message: NzMessageService
  ) {}

  public getCharacters(): void {
    this.loadingCharacters = true;
    this.charactersService.getAllCharacters().subscribe(
      (data) => {
        this.message.success('Personagens carregados com sucesso!');
        this.characters = data.data.results;

        console.log(data);
      },
      (error) => {
        this.message.error(error.message);
      },
      () => {
        this.loadingCharacters = false;
      }
    );
  }

  public getCharacterDetail(id: number): void {
    console.log(id);
  }

  ngOnInit(): void {
    this.getCharacters();
  }
}
