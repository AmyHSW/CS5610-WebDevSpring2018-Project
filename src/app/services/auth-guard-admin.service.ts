import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {UserService} from './user.service.client';
import {SharedService} from "./shared.service";

@Injectable()
export class AuthGuardAdmin implements CanActivate {

  constructor(private userService: UserService) {}

  canActivate() {
    return this.userService.loggedInAdmin();
  }
}
