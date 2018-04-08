import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './views/user/login/login.component';
import {ProductListComponent} from './views/product/product-list/product-list.component';
import {ProductNewComponent} from './views/product/product-new/product-new.component';
import {ProductListBusinessComponent} from './views/product/product-list-business/product-list-business.component';
import {ProductDetailComponent} from './views/product/product-detail/product-detail.component';
import {ProductEditComponent} from './views/product/product-edit/product-edit.component';
import {AuthGuard} from './services/auth-gaurd.service';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'product', component: ProductListComponent},
  {path: 'product/:productId', component: ProductDetailComponent},
  {path: 'user/product', component: ProductListBusinessComponent, canActivate: [AuthGuard]},
  {path: 'user/product/new', component: ProductNewComponent, canActivate: [AuthGuard]},
  {path: 'user/product/:productId/edit', component: ProductEditComponent, canActivate: [AuthGuard]}
];

export const routing = RouterModule.forRoot(appRoutes);
