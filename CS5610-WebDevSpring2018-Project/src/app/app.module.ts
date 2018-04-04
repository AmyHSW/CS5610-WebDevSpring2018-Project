import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProductNewComponent } from './views/product/product-new/product-new.component';
import { ProductEditComponent } from './views/product/product-edit/product-edit.component';
import { ProductListComponent } from './views/product/product-list/product-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductNewComponent,
    ProductEditComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
