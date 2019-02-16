// import { Injectable } from '@angular/core';
// import {HttpClient} from "@angular/common/http";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class CompanyService {
//
//   constructor(private http: HttpClient) { }
//
//   getAll() {
//     return this.http.get('http://localhost:3000/companies');
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Company} from "../_models";

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private currentCompanySubject: BehaviorSubject<Company[]>;
  public currentCompany: Observable<Company[]>;

  constructor(private http: HttpClient) {
    this.currentCompanySubject = new BehaviorSubject<Company[]>(JSON.parse(localStorage.getItem('currentCompany')));
    this.currentCompany = this.currentCompanySubject.asObservable();
  }

  public get currentCompanyValue(): Company[] {
    return this.currentCompanySubject.value;
  }

  getAll() {
    return this.http.get<Company[]>('http://localhost:3000/companies')
      .pipe(map(companies => {
        localStorage.setItem('currentCompany', JSON.stringify(companies));
        this.currentCompanySubject.next(companies);
        return companies;
      }));
  }
}

