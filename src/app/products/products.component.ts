import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public loading$ = new BehaviorSubject(true);

  readonly products$ = this.productsService.getProducts().pipe(
    tap(() => {
      this.loading$.next(false);
    })
  );

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {}
}
