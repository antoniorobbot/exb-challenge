import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { UsersService } from './../../services/users.service';
import { User } from './../../models/user.model';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Output() userChanged = new EventEmitter();

  private users;
  private selectedUser: User = new User();

  searchField: FormControl;
  form: FormGroup;
  order = 'asc';

  constructor(
    private userService: UsersService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadUsers();

    this.searchField = new FormControl();
    this.form = this.fb.group({ search: this.searchField });

    this.searchField.valueChanges
      .debounceTime(400)
      .switchMap(term => this.userService.getUsersSearch(term, this.order))
      .subscribe((result) => {
        this.users = result;
      });
  }

  loadUsers(): void {
    this.userService.getUsers(this.order)
      .subscribe(
        users => {
          this.users = users;
        },
        err => {
          console.log(err);
        });
  }

  changeOrder(order) {
    this.order = order;
    this.loadUsers();
  }

  selectUser(event, newUser): void {
    this.selectedUser = newUser;
    this.userChanged.emit(this.selectedUser.id.toString());
  }
}
