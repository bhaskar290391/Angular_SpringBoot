import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryServiceService {

   orderUrl=environment.ecommerceBaseUrl+"/orders";
  constructor(private httpClient:HttpClient) { }

  getOrderHistoryDetails(email:string):Observable<GetOrderHistoryDetails>{
    const fetchOrderHistoryUrl=this.orderUrl+"/search/findByCustomerEmailOrderByDateCreatedDesc?email="+email;
    return this.httpClient.get<GetOrderHistoryDetails>(fetchOrderHistoryUrl);
  }
}

interface GetOrderHistoryDetails{

  "_embedded": {
    "orders": OrderHistory[],
  }
}