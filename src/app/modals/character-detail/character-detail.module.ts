import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterDetailComponent } from './character-detail.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
} from '@ant-design/icons-angular/icons';
import { CharactersService } from 'src/app/services/characters/characters.service';

const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [CharacterDetailComponent],
  imports: [
    CommonModule,
    NzIconModule,
    NzIconModule.forRoot(icons),
    NzModalModule,
    NzMessageModule,
    NzSpinModule,
  ],
  providers: [NzMessageService],
})
export class CharacterDetailModule {}
