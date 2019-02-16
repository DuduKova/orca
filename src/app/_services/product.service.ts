import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Product} from "../_models";

@Injectable({ providedIn: 'root' })
export class ProductService {
  private currentProductSubject: BehaviorSubject<Product>;
  public currentProduct: Observable<Product>;

  constructor() {
    this.currentProductSubject = new BehaviorSubject<Product>(JSON.parse(localStorage.getItem('currentProduct')));
    this.currentProduct = this.currentProductSubject.asObservable();
  }

  public get currentProductValue(): Product {
    return this.currentProductSubject.value;
  }

  changeProduct(product) {
    this.currentProductSubject.next(product);
    console.log(product + ' inside service')
  }

}
