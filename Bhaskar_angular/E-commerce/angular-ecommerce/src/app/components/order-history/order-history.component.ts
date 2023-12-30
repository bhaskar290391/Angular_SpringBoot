import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/order';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryServiceService } from 'src/app/services/order-history-service.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  session:Storage=sessionStorage;
  orderHistory:OrderHistory[]=[]
  constructor(private service:OrderHistoryServiceService) { }

  ngOnInit(): void {
    this.getOrderHistoryData();
  }

  getOrderHistoryData() {
   const email:string=this.session.getItem("email")!;

   this.service.getOrderHistoryDetails(JSON.parse(email)).subscribe(
    data =>{
      this.orderHistory=data._embedded.orders;
    } 
   )

  }

}
