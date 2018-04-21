import { Component, OnInit } from '@angular/core';
import {FlickrService} from '../../../../services/flickr.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from "../../../../services/user.service.client";

@Component({
  selector: 'app-flickr',
  templateUrl: './flickr.component.html',
  styleUrls: ['./flickr.component.css']
})
export class FlickrComponent implements OnInit {
  user: any;
  photos: [any];
  error: string;
  searchText: string;

  constructor(private flickrService: FlickrService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService,
              private userService: UserService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
  }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          this.photos = val.photos;
        }
      );

  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';

    this.user.photo = url;
    this.userService
      .updateUser(this.user)
      .subscribe(
        (data: any) => {
          const result = data;
          if (result) { this.router.navigate(['/profile'] );
          } else {
            this.error = 'failed!';
          }
        }
      );

  }

}
