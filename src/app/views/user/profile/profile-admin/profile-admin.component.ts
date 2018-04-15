import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../../services/shared.service";
import {UserService} from "../../../../services/user.service.client";

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {
  user: {};
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) { }
  updateUser() {
    //console.log(user);
    this.route.params.subscribe(params => {
      this.userService.updateUser(this.user).subscribe();
    });
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => {
          this.sharedService.user = '';
          this.router.navigate(['/'])}
      );
  }
  ngOnInit() {
    this.user = this.sharedService.user;
  }

}
