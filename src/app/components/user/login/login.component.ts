import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  // properties
  title: string;
  disabledFlag: boolean;
  inputTxt: string;
  username: string;
  password: string;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService, private  router: Router) {
  }

  ngOnInit() {
    this.title = 'This is Login Page';
    this.disabledFlag = true;
  }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.userService.findUserByCredentials(this.username, this.password)
      .subscribe((user: any) => {
        if ((user !== null)) {
          this.router.navigate(['/user/', user._id]);
        } else {
          this.errorMsg = 'Invalid username or password !';
          this.errorFlag = true;
        }
      });
  }
}
