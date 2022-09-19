import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CartCountControlsModule } from '../core/cart-count-controls/cart-count-controls.module';
import { ProductsComponent } from './products.component';
import { ProductItemComponent } from './product-item/product-item.component';

const materialModules = [
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [ProductsComponent, ProductItemComponent],
  imports: [CommonModule, CartCountControlsModule, ...materialModules],
  exports: [ProductsComponent],
})
export class ProductsModule {}
