import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
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
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.less'],
})
export class CharacterDetailComponent implements OnInit {
  public character!: Character;

  constructor(
    private modal: NzModalRef,
    private charactersService: CharactersService
  ) {}

  public cancelar() {
    this.modal.close();
  }

  ngOnInit(): void {
    console.log(this.character);
  }
}
