import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service.client";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  href: string;
  userId: string;
  users: any[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService) { }

  deleteUser(deleteUserId) {
    this.userService.deleteUser(deleteUserId).subscribe((status) => {
      this.router.navigateByUrl(this.href);
    });
  }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    this.href = this.router.url;
    if (this.href.includes("followers")) {
      this.userService.findFollowersForUser(this.userId).subscribe(
        (users) => {
          this.users = users;
        }
      );
    } else if (this.href.includes("followings")) {
      this.userService.findFollowingsForUser(this.userId).subscribe(
        (users) => {
          this.users = users;
        }
      );
    } else {
      this.userService.findAllUsers().subscribe(
        (users) => {
          this.users = users;
        }
      );
    }

  }

}
