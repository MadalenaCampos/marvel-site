import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, NzToolTipModule, NzButtonModule],
  exports: [HomeComponent],
})
export class HomeModule {}
