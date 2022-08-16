import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CharacterDetailComponent } from 'src/app/modals/character-detail/character-detail.component';

import { CharactersService } from 'src/app/services/characters/characters.service';

interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
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
  private modalCharacter!: NzModalRef;

  constructor(
    private charactersService: CharactersService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {}

  public getCharacters(): void {
    this.loadingCharacters = true;
    this.charactersService.getAllCharacters().subscribe(
      (data) => {
        this.message.success('Personagens carregados com sucesso!');
        this.characters = data.data.results;
      },
      (error) => {
        this.message.error(error.statusText + ' , tente novamente mais tarde!');
      },
      () => {
        this.loadingCharacters = false;
      }
    );
  }

  public abrirModal(nzContent: any, character?: Character): void {
    this.modalCharacter = this.modalService.create({
      nzContent,
      nzFooter: null,
      nzWidth: '43.188rem',
      nzMaskClosable: false,
      nzStyle: {
        'box-shadow': '0px 0px 8px rgba(0, 0, 0, 0.2)',
        'border-radius': '8px',
      },
      nzComponentParams: {
        character,
      },
    });
  }

  public getCharacterDetail(character: Character): void {
    this.abrirModal(CharacterDetailComponent, character);
  }

  ngOnInit(): void {
    this.getCharacters();
  }
}
