import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './views/user/login/login.component';
import {ProductListComponent} from './views/product/product-list/product-list.component';
import {ProductNewComponent} from './views/product/product-new/product-new.component';
import {ProductListBusinessComponent} from './views/product/product-list-business/product-list-business.component';
import {ProductDetailComponent} from './views/product/product-detail/product-detail.component';
import {ProductEditComponent} from './views/product/product-edit/product-edit.component';
import {ProfileComponent} from "./views/user/profile/profile.component";
import {UserListComponent} from "./views/user/user-list/user-list.component";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'product', component: ProductListComponent},
  {path: 'user/:userId/product', component: ProductListBusinessComponent},
  {path: 'user/:userId/product/new', component: ProductNewComponent},
  {path: 'product/:productId', component: ProductDetailComponent},
  {path: 'user/:userId/product/:productId/edit', component: ProductEditComponent},

  {path: 'profile', component: ProfileComponent},
  {path: 'user/followers', component: UserListComponent},
  {path: 'user/followings', component: UserListComponent},
  {path: 'user/all', component: UserListComponent}

];

export const routing = RouterModule.forRoot(appRoutes);
