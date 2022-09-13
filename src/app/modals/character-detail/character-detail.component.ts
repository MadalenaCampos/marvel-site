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

  public loadingQuadrinhosDoPersonagem = false;
  public naoHaComics = false;
  public characterComics!: any;

  constructor(
    private modal: NzModalRef,
    private charactersService: CharactersService,
    private message: NzMessageService
  ) {}

  public getQuadrinhosDoPersonagem() {
    this.loadingQuadrinhosDoPersonagem = true;
    this.charactersService.getCharacterComicsById(this.character.id).subscribe(
      ({ data }) => {
        console.log(data);
        this.characterComics = data.results;

        if (!data.results.length) {
          this.naoHaComics = true;
        }
      },
      (error) => {
        this.message.error(error.statusText + ' , tente novamente mais tarde!');
      },
      () => {
        this.loadingQuadrinhosDoPersonagem = false;
      }
    );
  }

  ngOnInit(): void {
    this.getQuadrinhosDoPersonagem();
  }
}
