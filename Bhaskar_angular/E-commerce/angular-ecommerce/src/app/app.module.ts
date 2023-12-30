import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { Routes,RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import {OktaAuthModule,OktaCallbackComponent,OKTA_CONFIG, OktaAuthGuard} from '@okta/okta-angular';
import myAppConfig from './config/my-app-config';
import {OktaAuth} from  '@okta/okta-auth-js';
import { ProductService } from './services/product.service';
import { MembersPageComponent } from './components/members-page/members-page.component';
import {OrderHistoryComponent} from "./components/order-history/order-history.component"
import { AuthHttpInterceptorService } from './services/auth-http-interceptor.service';

const oktaConfig= myAppConfig.oidc;
const oktaAuth=new OktaAuth(oktaConfig);

function sendToLoginpage(oktaAuth:OktaAuth,injector:Injector){

  const router =injector.get(Router);
  router.navigate(['/login']);
}

const routes:Routes=[

  
  {path:"orders",component:OrderHistoryComponent, canActivate:[OktaAuthGuard],
                                                   data:{onAuthRequired:sendToLoginpage}},
  {path:"members",component:MembersPageComponent, canActivate:[OktaAuthGuard],
                                                   data:{onAuthRequired:sendToLoginpage}},
  {path:"login/callback",component:OktaCallbackComponent},
  {path:"login",component:LoginComponent},
  {path:"checkout",component:CheckoutComponent},
  {path:"cart-details",component:CartDetailsComponent},
  {path:"product/:id",component:ProductDetailsComponent},
  {path:"search/:keyword",component:ProductListComponent},
  {path:"category/:id",component:ProductListComponent},
  {path:"category",component:ProductListComponent},
  {path:"product",component:ProductListComponent},
  {path:"",redirectTo:"/product",pathMatch:"full"},
  {path:"**",redirectTo:"/product",pathMatch:"full"}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent
    
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
    
  ],
  providers: [ProductService,{provide:OKTA_CONFIG,useValue:{oktaAuth}},{
    provide:HTTP_INTERCEPTORS,useClass:AuthHttpInterceptorService,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
