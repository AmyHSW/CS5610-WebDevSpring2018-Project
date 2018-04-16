import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../../services/shared.service";
import {UserService} from "../../../services/user.service.client";
import {ActivatedRoute} from "@angular/router";
import {ReviewService} from "../../../services/review.service.client";


@Component({
  selector: 'app-profile-other',
  templateUrl: './profile-other.component.html',
  styleUrls: ['./profile-other.component.css']
})
export class ProfileOtherComponent implements OnInit {
  isAdmin: boolean;
  profileUser: any;
  loginUser: any;
  username: String;
  reviews: [any];
  followers: [any];
  followings: [any];

  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService
  ) { }

  follow() {
    this.userService.addFollow(this.loginUser._id, this.profileUser._id).subscribe(
      (any) => {
        alert("successfully follow!" + this.profileUser.username);
      }
    )
  }

  ngOnInit() {
    this.loginUser = this.sharedService.user;
    this.isAdmin = this.sharedService.user['type'] == 'ADMIN';
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.username = params['username'];
      }
    );
    this.userService.findUserByUsername(this.username).subscribe(
      (user) => {
        this.profileUser = user;
        this.reviewService.findAllReviewsForUser(this.profileUser._id).subscribe(
          (reviews) => {
            this.reviews = reviews;
          }
        )
        this.userService.findFollowersForUser(this.profileUser._id).subscribe(
          (followers) => {
            this.followers = followers;
            console.log(followers);
          }
        );
        this.userService.findFollowingsForUser(this.profileUser._id).subscribe(
          (followings) => {
            this.followings = followings;
            console.log(followings);
          }
        )
      }
    );
  }

}
