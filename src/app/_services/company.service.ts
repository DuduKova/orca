import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Company} from "../_models";

@Injectable({providedIn: 'root'})
export class CompanyService {
  private companiesSubject: BehaviorSubject<Company[]>;
  public companies: Observable<Company[]>;

  private selectedCompanySubject: BehaviorSubject<Company>;
  public currentCompany: Observable<Company>;

  constructor(private http: HttpClient) {
    this.companiesSubject = new BehaviorSubject<Company[]>(JSON.parse(localStorage.getItem('companies')));
    this.companies = this.companiesSubject.asObservable();
    this.selectedCompanySubject = new BehaviorSubject(null);
    this.currentCompany = this.selectedCompanySubject.asObservable();
  }

  public get companiesValue(): Company[] {
    return this.companiesSubject.value;
  }

  getAll() {
    return this.http.get<Company[]>('http://localhost:3000/companies')
      .pipe(map(companies => {
        localStorage.setItem('companies', JSON.stringify(companies));
        this.companiesSubject.next(companies);
        return companies;
      }));
  }

  changeCompany(company) {
    this.selectedCompanySubject.next(company);
  }
}

