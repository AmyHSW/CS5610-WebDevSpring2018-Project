import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProductNewComponent } from './views/product/product-new/product-new.component';
import { ProductEditComponent } from './views/product/product-edit/product-edit.component';
import { ProductListComponent } from './views/product/product-list/product-list.component';
import { LoginComponent } from './views/user/login/login.component';
import {routing} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {UserService} from './services/user.service.client';
import {ProductService} from './services/product.service.client';
import {SharedService} from './services/shared.service';
import { ProductListBusinessComponent } from './views/product/product-list-business/product-list-business.component';
import { ProductDetailComponent } from './views/product/product-detail/product-detail.component';

import {AuthGuard} from './services/auth-guard.service';

import { RegisterComponent } from './views/user/register/register.component';
import { ProfileComponent } from './views/user/profile/profile.component';
import { ProfileAdminComponent } from './views/user/profile/profile-admin/profile-admin.component';
import { ProfileReviewerComponent } from './views/user/profile/profile-reviewer/profile-reviewer.component';

import { HomeComponent } from './views/home/home.component';
import { UserListComponent } from './views/user/user-list/user-list.component';

import {ReviewListComponent} from "./views/review/review-list/review-list.component";
import {ReviewNewComponent} from "./views/review/review-new/review-new.component";



@NgModule({
  declarations: [
    AppComponent,
    ProductNewComponent,
    ProductEditComponent,
    ProductListComponent,
    LoginComponent,
    ProductListBusinessComponent,
    ProductDetailComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileAdminComponent,
    ProfileReviewerComponent,
    HomeComponent,
    UserListComponent,
    ReviewListComponent,
    ReviewNewComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule
  ],
  providers: [UserService, ProductService, SharedService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
