import { Component, OnInit } from '@angular/core';
import {ReviewService} from "../../../services/review.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service";
import {UserService} from "../../../services/user.service.client";

@Component({
  selector: 'app-review-list-of-reviewer',
  templateUrl: './review-list-of-reviewer.component.html',
  styleUrls: ['./review-list-of-reviewer.component.css']
})
export class ReviewListOfReviewerComponent implements OnInit {

  user: any;
  reviews: any;
  noUser: boolean;

  constructor(private reviewService: ReviewService,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.loggedIn().subscribe(
      (isLoggedIn) => {
        this.noUser = !isLoggedIn;
      }
    );
    this.user = this.sharedService.user;
    this.reviewService.findAllReviewsForUser(this.user._id).subscribe(
      (reviews: any) => {
        this.reviews = reviews;
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
}
