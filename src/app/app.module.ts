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
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {SharedService} from './services/shared.service';
import { ProductListBusinessComponent } from './views/product/product-list-business/product-list-business.component';
import { ProductDetailComponent } from './views/product/product-detail/product-detail.component';
import {AuthGuard} from './services/auth-gaurd.service';


@NgModule({
  declarations: [
    AppComponent,
    ProductNewComponent,
    ProductEditComponent,
    ProductListComponent,
    LoginComponent,
    ProductListBusinessComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule
  ],
  providers: [UserService, ProductService, SharedService, AuthGuard, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
