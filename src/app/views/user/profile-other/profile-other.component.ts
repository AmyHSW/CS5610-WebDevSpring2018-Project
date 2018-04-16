import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../../services/shared.service";
import {UserService} from "../../../services/user.service.client";
import {ActivatedRoute} from "@angular/router";
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-profile-other',
  templateUrl: './profile-other.component.html',
  styleUrls: ['./profile-other.component.css']
})
export class ProfileOtherComponent implements OnInit {
  isAdmin: boolean;
  user: any;
  username: String;

  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isAdmin = this.sharedService.user['type'] == 'ADMIN';
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.username = params['username'];
      }
    );
    this.userService.findUserByUsername(this.username).subscribe(
      (user) => {
        this.user = user;
      }
    )
  }
  @ViewChild('tabs') public test;

  changeTab() {
    this.test.setActiveTab(3);
  }

}
