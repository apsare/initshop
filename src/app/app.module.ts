import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductsComponent } from './components/shop/products/products.component';
import { SingleProductComponent } from './components/shop/single-product/single-product.component';
import { CartComponent } from './components/shop/cart/cart.component';

import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShopComponent } from './components/shop/shop.component';
import { ModalAddToCartComponent } from './components/shop/modal-add-to-cart/modal-add-to-cart.component';
import { ModalQuickViewComponent } from './components/shop/modal-quick-view/modal-quick-view.component';
import { CategoryComponent } from './components/shop/category/category.component';
import { CategoryService } from './services/category.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/shop/checkout/checkout.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: 'home', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'single-product/:id', component: SingleProductComponent},
  {path: 'cart', component: CartComponent},
  {path: 'category/:id', component: CategoryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'checkout', canActivate:[AuthGuard], component: CheckoutComponent},
  {path: 'notFound', component: NotFoundComponent},
  {path: '**', redirectTo: 'notFound',pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    NotFoundComponent,
    ShopComponent,
    ModalAddToCartComponent,
    ModalQuickViewComponent,
    CategoryComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
