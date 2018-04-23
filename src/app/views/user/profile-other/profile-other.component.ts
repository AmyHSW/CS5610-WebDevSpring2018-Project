import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../../services/shared.service";
import {UserService} from "../../../services/user.service.client";
import {ActivatedRoute, Router} from "@angular/router";
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
  isFollowing: boolean;
  isReviewer: boolean;
  profileIsReviewer: boolean;

  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private router: Router
  ) { }

  follow() {
    this.userService.addFollow(this.loginUser._id, this.profileUser._id).subscribe(
      (any) => {
        this.userService.findFollowersForUser(this.profileUser._id).subscribe(
          (followers) => {
            console.log("add follow success!!");
            this.followers = followers;
            console.log(followers);
            this.isFollowing = true;
            alert("successfully follow " + this.profileUser.username + "!");
          }
        );
      }
    );
    console.log(this.followers);
  }

  unfollow() {
    this.userService.deleteFollow(this.loginUser._id, this.profileUser._id).subscribe(
      (any) => {
        this.userService.findFollowersForUser(this.profileUser._id).subscribe(
          (followers) => {
            console.log("delete follow success!!");
            this.followers = followers;
            console.log(followers);
            this.isFollowing = false;
            //this.router.navigateByUrl(this.router.url);
          }
        );
      }
    )
  }

  deleteUser() {
    this.userService.deleteUser(this.profileUser._id).subscribe(
      (any) => {
        alert("successfully delete user: " + this.profileUser.username + "!");
        this.router.navigate(["user/all"]);
      }
    )
  }

  ngOnInit() {
    this.profileIsReviewer = true;
    this.loginUser = this.sharedService.user;
    this.isAdmin = this.sharedService.user['type'] == 'ADMIN';
    this.isReviewer = this.sharedService.user['type'] == 'REVIEWER';
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.username = params['username'];
      }
    );
    this.userService.findUserByUsername(this.username).subscribe(
      (user) => {
        this.profileUser = user;
        if (user['type'] !== 'REVIEWER') {
          this.profileIsReviewer = false;
          return;
        }
        this.reviewService.findAllReviewsForUser(this.profileUser._id).subscribe(
          (reviews) => {
            this.reviews = reviews;
          }
        );
        this.userService.findFollowersForUser(this.profileUser._id).subscribe(
          (followers) => {
            this.followers = followers;
            for (let i = 0; i < followers.length; i++) {
              if (followers[i]._id === this.loginUser._id) {
                this.isFollowing = true;
                return;
              }
            }
          }
        );
        this.userService.findFollowingsForUser(this.profileUser._id).subscribe(
          (followings) => {
            this.followings = followings;
          }
        )
      }
    );
  }

}
