import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  public personagens!: any;
  public modalDePersonagem!: NzModalRef;
  public loadingPersonagens = false;

  constructor(
    private router: Router,
    private charactersService: CharactersService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  public getPersonagens() {
    this.loadingPersonagens = true;
    const offsetAleatorio = Math.floor(Math.random() * 520);

    this.charactersService.getAllCharacters(3, offsetAleatorio).subscribe(
      ({ data }) => {
        this.personagens = data.results;
      },
      ({ error }) => {
        this.message.error(error.code + ' - ' + error.status);
      },
      () => {
        this.loadingPersonagens = false;
      }
    );
  }

  public abrirModal(nzContent: any, character?: Character): void {
    this.modalDePersonagem = this.modalService.create({
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

  public getInformacoesDoPersoangem(character: Character): void {
    this.abrirModal(CharacterDetailComponent, character);
  }

  public irParaPersonagens() {
    this.router.navigate(['/characters']);
  }

  ngOnInit(): void {
    this.getPersonagens();
  }
}
