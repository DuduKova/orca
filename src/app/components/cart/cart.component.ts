import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../_services/data.service";
import {CartService} from "../../_services/cart.service";
import {Observable, Subscription} from "rxjs";
import {Cart} from "../../_models";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // public cart;
  // private cart$: Observable<Cart>;
  currentCart: Cart;
  currentCartSubscription: Subscription;
  @Input() currentUser;

  constructor(private data: DataService, private cartService: CartService) {}

  ngOnInit() {
    // this.cart$ = this.cartService.getOne(this.currentUser._id);
    // this.data.getCart(this.cart$);
   // this.data.currentCart.subscribe(cart => this.cart = cart);
    this.currentCartSubscription = this.cartService.currentCart.subscribe(cart => {
      this.currentCart = cart;
    });
  }
}

