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
  public loadingPersonagens = false;
  public personagens!: any;
  public personagemFiltrado!: any;
  public modalDoPersonagem!: NzModalRef;

  public total!: number;
  public pageIndex = 1;
  public offset = 0;
  public limit = 100;

  constructor(
    private charactersService: CharactersService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {}

  public filtrarPersonagens(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.personagemFiltrado = this.personagens.filter((character: any) => {
      character.name.toLowerCase().includes(value);
    });
  }

  public mudarPagina(event: any): void {
    this.pageIndex = event;
    const offset = (this.pageIndex - 1) * this.limit;
    this.getPersonagens(this.limit, offset);
  }

  public getPersonagens(limit: number, offset: number): void {
    this.loadingPersonagens = true;
    this.charactersService.getAllCharacters(limit, offset).subscribe(
      ({ data }) => {
        this.total = data.total;
        this.personagens = data.results;
        this.personagemFiltrado = data.results;
      },
      ({ error }) => {
        console.log(error);
        this.message.error(error.code + ' - ' + error.status);
      },
      () => {
        this.loadingPersonagens = false;
      }
    );
  }

  public abrirModal(nzContent: any, character?: Character): void {
    this.modalDoPersonagem = this.modalService.create({
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

  public getInformacoesDoPersonagem(character: Character): void {
    this.abrirModal(CharacterDetailComponent, character);
  }

  ngOnInit(): void {
    this.getPersonagens(this.limit, this.offset);
  }
}
