import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { NumberInputComponent } from './number-input/number-input.component';

@NgModule({
  declarations: [LoadingComponent, NumberInputComponent],
  imports: [CommonModule],
  exports: [LoadingComponent, NumberInputComponent],
})
export class SharedModule {}
