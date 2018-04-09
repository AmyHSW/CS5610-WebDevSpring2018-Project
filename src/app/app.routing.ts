import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './views/user/login/login.component';
import {ProductListComponent} from './views/product/product-list/product-list.component';
import {ProductNewComponent} from './views/product/product-new/product-new.component';
import {ProductListBusinessComponent} from './views/product/product-list-business/product-list-business.component';
import {ProductDetailComponent} from './views/product/product-detail/product-detail.component';
import {ProductEditComponent} from './views/product/product-edit/product-edit.component';
import {ProfileComponent} from './views/user/profile/profile.component';
import {UserListComponent} from './views/user/user-list/user-list.component';
import {ReviewListComponent} from './views/review/review-list/review-list.component';
import {ReviewNewComponent} from './views/review/review-new/review-new.component';
import {AuthGuard} from './services/auth-guard.service';
import {RegisterComponent} from './views/user/register/register.component';
import {ProductListObserverComponent} from './views/product/product-list-observer/product-list-observer.component';
import {HomeComponent} from './views/home/home.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'product', component: ProductListComponent},
  {path: 'product/:productId', component: ProductDetailComponent},
  {path: 'product/:productId/review', component: ReviewListComponent},
  {path: 'product/:productId/review/new', component: ReviewNewComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'user/followers', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'user/followings', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'user/all', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'user/favorite', component: ProductListObserverComponent, canActivate: [AuthGuard]},
  {path: 'user/product', component: ProductListBusinessComponent, canActivate: [AuthGuard]},
  {path: 'user/product/new', component: ProductNewComponent, canActivate: [AuthGuard]},
  {path: 'user/product/:productId/edit', component: ProductEditComponent, canActivate: [AuthGuard]},
  {path: 'user/followers', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'user/followings', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'user/all', component: UserListComponent, canActivate: [AuthGuard]},


];

export const routing = RouterModule.forRoot(appRoutes);
