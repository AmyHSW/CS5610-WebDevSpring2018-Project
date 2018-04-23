import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './views/user/login/login.component';
import {ProductListComponent} from './views/product/product-list/product-list.component';
import {ProductNewComponent} from './views/product/product-new/product-new.component';
import {ProductListBusinessComponent} from './views/product/product-list-business/product-list-business.component';
import {ProductDetailComponent} from './views/product/product-detail/product-detail.component';
import {ProfileComponent} from './views/user/profile/profile.component';
import {UserListComponent} from './views/user/user-list/user-list.component';
import {ReviewNewComponent} from './views/review/review-new/review-new.component';
import {AuthGuard} from './services/auth-guard.service';
import {RegisterComponent} from './views/user/register/register.component';
import {ProductListObserverComponent} from './views/product/product-list-observer/product-list-observer.component';
import {HomeComponent} from './views/home/home.component';
import {ReviewListOfReviewerComponent} from "./views/review/review-list-of-reviewer/review-list-of-reviewer.component";
import {AuthGuardReviewer} from "./services/auth-guard-reviewer.service";
import {AuthGuardAdmin} from "./services/auth-guard-admin.service";
import {AuthGuardObserver} from "./services/auth-guard-observer.service";
import {AuthGuardBusiness} from "./services/auth-guard-business.service";
import {UserFollowersComponent} from "./views/user/user-followers/user-followers.component";
import {UserFollowingsComponent} from "./views/user/user-followings/user-followings.component";
import {ProfileOtherComponent} from "./views/user/profile-other/profile-other.component";
import {FlickrComponent} from "./views/user/profile/flickr/flickr.component";
import {ProductItemDetailComponent} from "./views/product/product-item-detail/product-item-detail.component";


const appRoutes: Routes = [
  // guest pages
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'product', component: ProductListComponent},
  {path: 'product/:productId/:reviewPage', component: ProductDetailComponent},
  {path: 'productItem/:itemId', component: ProductItemDetailComponent},

  // require user logged in
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile/flickr', component: FlickrComponent, canActivate: [AuthGuard]},
  {path: 'reviewers', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'username/:username', component: ProfileOtherComponent, canActivate: [AuthGuard]},

  // require ADMIN logged in
  {path: 'user/all', component: UserListComponent, canActivate: [AuthGuardAdmin]},

  // require REVIEWER logged in
  {path: 'product/:productId/review/new', component: ReviewNewComponent, canActivate: [AuthGuardReviewer]},
  {path: 'user/followers', component: UserFollowersComponent, canActivate: [AuthGuardReviewer]},
  {path: 'user/followings', component: UserFollowingsComponent, canActivate: [AuthGuardReviewer]},
  {path: 'user/review', component: ReviewListOfReviewerComponent, canActivate: [AuthGuardReviewer]},

  // require OBSERVER logged in
  {path: 'user/favorite', component: ProductListObserverComponent, canActivate: [AuthGuardObserver]},

  // require BUSINESS logged in
  {path: 'user/product', component: ProductListBusinessComponent, canActivate: [AuthGuardBusiness]},
  {path: 'user/product/new', component: ProductNewComponent, canActivate: [AuthGuardBusiness]},
];

export const routing = RouterModule.forRoot(appRoutes);
