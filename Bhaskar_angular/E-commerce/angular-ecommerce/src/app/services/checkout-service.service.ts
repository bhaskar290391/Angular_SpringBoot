import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {

  checkOutURL=environment.ecommerceBaseUrl+"/checkout/save";
  paymentIntentUrl=environment.ecommerceBaseUrl+"/checkout/payment-intent"
  constructor(private httpClient:HttpClient) { }

  saveCheckoutForm(purchase:Purchase):Observable<any>{
    return this.httpClient.post(this.checkOutURL,purchase);
  }

  createPaymentIntent(paymentInfo:PaymentInfo):Observable<any>{
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl,paymentInfo);
  }
}
