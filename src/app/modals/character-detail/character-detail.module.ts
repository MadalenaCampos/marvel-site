import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterDetailComponent } from './character-detail.component';

import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [CharacterDetailComponent],
  imports: [CommonModule, NzModalModule],
})
export class CharacterDetailModule {}
