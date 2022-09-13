import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    NzIconModule,
    NzIconModule.forRoot(icons),
    NzToolTipModule,
    NzButtonModule,
    NzSpinModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
