import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersComponent } from './characters.component';
import { CharacterDetailModule } from 'src/app/modals/character-detail/character-detail.module';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
} from '@ant-design/icons-angular/icons';
import { CharactersService } from 'src/app/services/characters/characters.service';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];

@NgModule({
  declarations: [CharactersComponent],
  imports: [
    CommonModule,
    CharacterDetailModule,
    NzIconModule,
    NzIconModule.forRoot(icons),
    NzInputModule,
    NzAutocompleteModule,
    NzButtonModule,
    NzMessageModule,
    NzSpinModule,
    NzPaginationModule,
    NzAlertModule,
    NzToolTipModule,
  ],
  providers: [NzMessageService, CharactersService],
})
export class CharactersModule {}
