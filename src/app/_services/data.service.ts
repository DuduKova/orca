import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedCompany = new BehaviorSubject(null);
  currentCompany = this.selectedCompany.asObservable();

  constructor() { }

  changeCompany(company) {
    this.selectedCompany.next(company);
  }
}
