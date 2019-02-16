import {Component, Input, OnInit} from '@angular/core';
import {Company, User} from "../../_models";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../_services";
import {CompanyService} from "../../_services/company.service";
import {Subscription} from "rxjs";
import {DataService} from "../../_services/data.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  private selectedCompany: Company;
  currentCompanies: Company[];
  currentCompaniesSubscription: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private companiesSearvice: CompanyService,
    private data: DataService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.companiesSearvice.getAll().subscribe();
    this.currentCompaniesSubscription = this.companiesSearvice.currentCompany.subscribe(companies => {
      this.currentCompanies = companies;
    });
    this.data.currentCompany.subscribe(company => this.selectedCompany = company);
  }

  selectCompany(company) {
    this.data.changeCompany(company);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
