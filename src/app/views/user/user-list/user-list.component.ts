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
  users: [any];
  isAdmin: boolean;
  searchText: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService) { }

  searchUsers() {
    if (this.href.includes("reviewers")) {
      this.userService.findReviewersByUsernameLike(this.searchText).subscribe(
        (reviewers) => {
          this.users = reviewers;
        }
      );
    } else {
      this.userService.findUsersByUsernameLike(this.searchText).subscribe(
        (users) => {
          this.users = users;
        }
      );
    }
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => {
          this.sharedService.user = '';
          (data: any) => this.router.navigate(['/'])
        }
      );
  }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    this.isAdmin = this.sharedService.user['type'] == 'ADMIN';
    this.href = this.router.url;
    if (this.href.includes("reviewers")) {
      this.userService.findAllReviewers().subscribe(
        (reviewers) => {
          reviewers.sort((a, b): number => {
            return b.followers.length - a.followers.length;
          });
          this.users = reviewers.splice(0, 10);
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
