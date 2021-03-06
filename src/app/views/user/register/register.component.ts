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
  user: any;
  v_password: String;

  errorFlag: boolean;
  errorMsg: String;
  passwordFlag: boolean;
  passwordMsg: String;
  errorAlert: String;
  passwordAlert: String;
  selectedValue: String;
  public filterTypes = [
    {value:'REVIEWER', display:'Reviewer'},
    {value:'OBSERVER', display:'Observer'},
    {value:'BUSINESS', display:'Business'}
  ];

  constructor(private userService: UserService,
              private router: Router) { }

  filterChanged(selectedValue:string){
    console.log('value is ',selectedValue);
    this.selectedValue = selectedValue;
  }

  register() {
    this.user.username = this.registerForm.value.username;
    this.user.password = this.registerForm.value.password;
    this.user.type = this.selectedValue;
    this.v_password = this.registerForm.value.v_password;

    this.errorFlag = false;
    this.passwordFlag = false;

    if (this.v_password !== this.user.password) {
      this.passwordFlag = true;
      this.passwordMsg = 'Password mis-matching!';
      return;
    }
    this.userService.findUserByUsername(this.user.username).subscribe(
      (data: any) => {
        if (data) {
          this.errorFlag = true;
          this.errorMsg = 'This username is in use. Please enter a different one.';
        } else {
          return this.userService.register(this.user.username, this.user.password, this.user.type, this.user.photo)
            .subscribe(
              (newUser: any) => {
                console.log(newUser['type']);
                this.router.navigate(['/profile']);
              }, (error: any) => {
                this.errorFlag = true;
                this.errorMsg = error._body;
              }
            );
        }
      });
  }
  cancel() {
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.errorAlert = '* Please enter username';
    this.passwordAlert = '* Please enter password';
    this.user = UserService.getNewUser();
    this.selectedValue = 'REVIEWER'
  }

}
