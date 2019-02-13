import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedCompany = new BehaviorSubject(null);
  currentCompany = this.selectedCompany.asObservable();

  private cart = new BehaviorSubject(null);
  currentCart = this.cart.asObservable();

  constructor() { }

  changeCompany(company) {
    this.selectedCompany.next(company);
  }

  getCart(cart) {
    this.cart.next(cart);
  }
}
