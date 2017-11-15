import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // properties
  userId: string;
  user: any;
  username: string;
  firstName: string;
  lastName: string;
  password: string;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
        }
      );
    this.userService.findUserById(this.userId)
      .subscribe((returnedUser: any) => {
        this.username = returnedUser.username;
        this.firstName = returnedUser.firstName;
        this.lastName = returnedUser.lastName;
        this.password = returnedUser.password;
      });
  }

  updateUser() {
    this.user = {
      _id: this.userId,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    };
    this.userService.updateUser(this.userId, this.user)
      .subscribe((user: any) => {
      });
  }
}
