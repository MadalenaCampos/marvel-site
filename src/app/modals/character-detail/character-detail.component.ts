import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CharactersService } from 'src/app/services/characters/characters.service';

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.less'],
})
export class CharacterDetailComponent implements OnInit {
  public character!: Character;

  public loadingCharacterComics = false;
  public naoHaComics = false;
  public characterComics!: any;

  constructor(
    private modal: NzModalRef,
    private charactersService: CharactersService,
    private message: NzMessageService
  ) {}

  public getCharacterComics() {
    this.loadingCharacterComics = true;
    this.charactersService.getCharacterComicsById(this.character.id).subscribe(
      ({ data }) => {
        this.characterComics = data.results;
        this.message.success('Comics carregados com sucesso!');

        if (!data.results.length) {
          this.naoHaComics = true;
        }
      },
      (error) => {
        this.message.error(error.statusText + ' , tente novamente mais tarde!');
      },
      () => {
        this.loadingCharacterComics = false;
      }
    );
  }

  ngOnInit(): void {
    this.getCharacterComics();
  }
}
