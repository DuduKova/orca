import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../_models";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../_services";
import {CompanyService} from "../../_services/company.service";
import {BehaviorSubject, Observable} from "rxjs";
import {DataService} from "../../_services/data.service";
import {CartService} from "../../_services/cart.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() currentUser: User;
  private companies$: Observable<any>;
  public selectedCompany;
  private cart$: Observable<any>;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private companiesSearvice: CompanyService,
    private data: DataService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
     this.companies$ = this.companiesSearvice.getAll();
     this.data.currentCompany.subscribe(company => this.selectedCompany = company);
  }

  selectCompany(company) {
    this.data.changeCompany(company);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/loginPage']);
  }
}
