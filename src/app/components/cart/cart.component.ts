import {Component, OnInit} from '@angular/core';
import {DataService} from "../../_services/data.service";
import {CartService} from "../../_services/cart.service";
import {Subscription} from "rxjs";
import {Cart, Company, User} from "../../_models";
import {AuthenticationService} from "../../_services";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import {CompanyService} from "../../_services/company.service";

@Component({
  selector: 'app-cart',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '100%',
        opacity: 1,
        display: 'block',
      })),
      state('closed', style({
        height: '100px',
        opacity: 0,
        display: 'none',
      })),
      transition('open => closed', [
        animate('700ms ease-in', style({transform: 'translateX(-100%)'}))
      ]),
      transition('closed => open', [
        animate('700ms ease-in', style({transform: 'translateX(100%)'}))
      ]),
    ]),
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  currentCart: Cart;
  currentCartSubscription: Subscription;
  currentUser: User;
  selectedCompany: Company;
  isOpen = true;

  constructor(private data: DataService, private cartService: CartService,
              private authenticationService: AuthenticationService,
              private companiesSearvice : CompanyService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.companiesSearvice.currentCompany.subscribe(company => this.selectedCompany = company);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }


  ngOnInit() {
    // @ts-ignore
    this.cartService.getOne(this.currentUser._id).subscribe();
    this.currentCartSubscription = this.cartService.currentCart.subscribe(cart => {
      this.currentCart = cart;
    });
  }

  deleteItem(pid) {
    this.cartService.deleteItem(pid)
  }
}

