import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-profile-reviewer',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private sharedService : SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    console.log(this.user);
  }

}
