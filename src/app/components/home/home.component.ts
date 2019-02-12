import {Component, OnInit, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

import {User} from '../../_models';
import {UserService, AuthenticationService} from '../../_services';
import {DataService} from "../../_services/data.service";

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  public selectedCompany;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private data: DataService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    // this.loadAllUsers();
    this.data.currentCompany.subscribe(company => this.selectedCompany = company);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
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
