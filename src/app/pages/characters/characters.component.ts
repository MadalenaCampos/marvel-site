import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { debounce } from 'rxjs';
import { CharacterDetailComponent } from 'src/app/modals/character-detail/character-detail.component';

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
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.less'],
})
export class CharactersComponent implements OnInit {
  public loadingCharacters = false;
  public characters!: any;
  public charactersFilter!: any;
  public modalCharacter!: NzModalRef;

  // Paginação
  public pageIndex = 1;
  public offset = 0;
  public limit = 20;

  constructor(
    private charactersService: CharactersService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {}

  public search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.charactersFilter = this.characters.filter((character: any) =>
      character.name.toLowerCase().includes(value)
    );
  }

  public pageChange(event: any): void {
    this.pageIndex = event;
    const offset = (this.pageIndex - 1) * this.limit;
    this.getCharacters(this.limit, offset);
  }

  public getCharacters(limit: number, offset: number): void {
    this.loadingCharacters = true;
    this.charactersService.getAllCharacters(limit, offset).subscribe(
      ({ data }) => {
        this.characters = data.results;
        this.charactersFilter = data.results;
      },
      ({ error }) => {
        console.log(error);
        this.message.error(error.code + ' - ' + error.status);
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
      nzWidth: '740px',
      nzMaskClosable: false,
      nzStyle: {
        'box-shadow': '0px 0px 8px rgba(0, 0, 0, 0.2)',
        'border-radius': '22px',
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
    this.getCharacters(this.limit, this.offset);
  }
}
