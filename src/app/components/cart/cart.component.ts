import {Component, OnInit} from '@angular/core';
import {DataService} from "../../_services/data.service";
import {CartService} from "../../_services/cart.service";
import {Subscription} from "rxjs";
import {Cart, User} from "../../_models";
import {AuthenticationService} from "../../_services";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  currentCart: Cart;
  currentCartSubscription: Subscription;
  currentUser: User;

  constructor(private data: DataService, private cartService: CartService, private authenticationService: AuthenticationService,) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
    // @ts-ignore
    this.cartService.getOne(this.currentUser._id).subscribe();
    this.currentCartSubscription = this.cartService.currentCart.subscribe(cart => {
      this.currentCart = cart;
    });
  }
}

