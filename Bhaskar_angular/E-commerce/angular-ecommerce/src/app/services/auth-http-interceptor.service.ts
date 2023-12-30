import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Observable, from, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor{

  constructor(@Inject(OKTA_AUTH) private oktaAuth:OktaAuth) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req,next))
  }
  async handle(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
   
    const url=environment.ecommerceBaseUrl+"/orders";
    const securedUrl=[url];

    if(securedUrl.some(url =>req.urlWithParams.includes(url))){

      const accessToken =this.oktaAuth.getAccessToken();
      req =req .clone({
        setHeaders :{
          Authorization :"Bearer "+accessToken          
        }
      })
    }
   
    return await lastValueFrom(next.handle(req));
  }
}
