import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../../services/user.service.client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  username: String;
  password: String;
  type: String;
  confirmPassword: String;
  errorMsg = 'Passwords are different!';
  errorFlag = false;

  constructor(
    private userService: UserService,
    private router: Router) { }

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password1;
    this.confirmPassword = this.registerForm.value.password2;
    this.type = this.registerForm.value.type;

    if (this.password === this.confirmPassword) {
      this.userService.register(this.username, this.password, this.type)
        .subscribe(
          (data: any) => {
            this.router.navigate(['/profile']);
          },
          (error: any) => {
            this.errorMsg = error._body;
          }
        );

    } else {
      this.errorFlag = true;
    }
  }

  ngOnInit() {
  }
}
