import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

import {Company, Product} from "../_models";
import {catchError, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private currentProductSubject: BehaviorSubject<Product>;
  public currentProduct: Observable<Product>;

  private allProductsSubject: BehaviorSubject<Product[]>;
  public allProducts: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this.currentProductSubject = new BehaviorSubject<Product>(JSON.parse(localStorage.getItem('currentProduct')));
    this.currentProduct = this.currentProductSubject.asObservable();

    // this.allProductsSubject = new BehaviorSubject<Product[]>(JSON.parse(localStorage.getItem('allProducts')));
    // this.allProducts = this.allProductsSubject.asObservable();
  }

  public get currentProductValue(): Product {
    return this.currentProductSubject.value;
  }

  changeProduct(product) {
    this.currentProductSubject.next(product);
  }



}
//   switchMap(() => {
//   return this.movieService.getMoviesFirst().pipe(
//     map(movies => _.uniqBy(movies , 'Title')),
//   map(movies => new moviesActions.LoadMoviesSuccess(movies)),
//   catchError(err => of(new moviesActions.LoadMoviesFail(err))));
// }));

