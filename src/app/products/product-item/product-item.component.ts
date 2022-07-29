import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product.interface';
import { CartService } from '../../cart/cart.service';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { CartCountControlsComponent } from '../../core/cart-count-controls/cart-count-controls.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  @Input() index!: number;

  @ViewChild('cartBtn', { static: false, read: ElementRef }) cartBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('controls', { static: false }) countControls:
    | CartCountControlsComponent
    | undefined;

  countInCart$!: Observable<number>;

  constructor(private readonly cartService: CartService) {}

  get id(): string {
    return this.product.id;
  }

  get isCartButtonDisabled(): boolean {
    return this.product.count === 0;
  }

  get cartButtonTooltip(): string {
    return this.isCartButtonDisabled
      ? 'Out of stock'
      : `Add ${this.product.title} to cart`;
  }

  ngOnInit(): void {
    this.countInCart$ = this.cartService.cart$.pipe(
      map((cart) => {
        if (!(this.id in cart)) {
          return 0;
        }

        return cart[this.id];
      }),
      this.updateFocusIfNeeded(),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );
  }

  add(): void {
    this.cartService.addItem(this.id);
  }

  remove(): void {
    this.cartService.removeItem(this.id);
  }

  /** Move focus to a corresponding control when controls switch */
  private updateFocusIfNeeded() {
    let prev: number;

    return (observable: Observable<number>): Observable<number> =>
      observable.pipe(
        tap((curr) => {
          if (prev === 0 && curr === 1) {
            setTimeout(() => this.countControls?.focusAddBtn());
          } else if (prev === 1 && curr === 0) {
            setTimeout(() => this.cartBtn?.nativeElement.focus());
          }

          prev = curr;
        })
      );
  }
}
