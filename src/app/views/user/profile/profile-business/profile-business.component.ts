import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/user.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../../services/shared.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-profile-business',
  templateUrl: './profile-business.component.html',
  styleUrls: ['./profile-business.component.css']
})
export class ProfileBusinessComponent implements OnInit {

  user: any;
  username: String;
  errorFlag: boolean;
  errorMsg: String;
  updateFlag: boolean;
  updateMsg: String;
  alert: String;
  baseUrl: String;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService) { }

  updateUser() {
    this.updateFlag = false;
    this.errorFlag = false;
    if (this.username !== this.user.username) {
      if (this.username === '') {
        this.errorFlag = true;
        this.errorMsg = 'Please enter username!';
        return;
      }
      this.userService.findUserByUsername(this.username).subscribe(
        (user: any) => {
          if (user) {
            this.errorFlag = true;
            this.errorMsg = 'The username is in use. Please enter a different name.';
          } else {
            this.user.username = this.username;
            this.update();
          }
        },
        (error: any) => console.log(error)
      );
    } else {
      this.update();
    }
  }
  update() {
    this.userService.updateUser(this.user).subscribe(
      (response: any) => {
        this.updateFlag = true;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => {
          this.sharedService.user = '';
          this.router.navigate(['/']);
        }
      );
  }
  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.getUser();
    this.updateFlag = false;
    this.errorFlag = false;
    this.updateMsg = 'Profile updated!';
    this.alert = '* Please enter username';
  }
  getUser() {
    this.user = this.sharedService.user;
    this.username = this.user.username;
  }

}
