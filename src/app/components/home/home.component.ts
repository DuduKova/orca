import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {User} from '../../_models';
import {UserService, AuthenticationService} from '../../_services';
import {CompanyService} from "../../_services/company.service";

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  public selectedCompany;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private companiesSearvice: CompanyService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    // this.loadAllUsers();
    this.companiesSearvice.currentCompany.subscribe(company => this.selectedCompany = company);

  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  // deleteUser(id: number) {
  //     this.userService.delete(id).pipe(first()).subscribe(() => {
  //         this.loadAllUsers()
  //     });
  // }

  // private loadAllUsers() {
  //     this.userService.getAll().pipe(first()).subscribe(users => {
  //         this.users = users;
  //     });
  // }
}
