import {Component, Input, OnInit} from '@angular/core';
import {Company, User} from "../../_models";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../_services";
import {CompanyService} from "../../_services/company.service";
import {Subscription} from "rxjs";
import {DataService} from "../../_services/data.service";
import {CartService} from "../../_services/cart.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  selectedCompany: Company;
  currentCompanies: Company[];
  currentCompaniesSubscription: Subscription;
  isOpen = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private companiesSearvice: CompanyService,
    private cartService: CartService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.cartService.openCart.subscribe(toggle => this.isOpen = toggle);
  }

  ngOnInit() {
    this.companiesSearvice.getAll().subscribe();
    this.currentCompaniesSubscription = this.companiesSearvice.companies.subscribe(companies => {
      this.currentCompanies = companies;
    });
    this.companiesSearvice.currentCompany.subscribe(company => this.selectedCompany = company);
  }

  toggle() {
    this.cartService.cartToggle(!this.isOpen);
  }

  selectCompany(company) {
    this.companiesSearvice.changeCompany(company);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
