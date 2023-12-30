import { Injectable } from '@angular/core';
import { Product } from './common/product';
import { CartItem } from './common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:CartItem[]=[];
  totalPrice:Subject<number>=new BehaviorSubject<number>(0);
  totalQuantities:Subject<number>=new BehaviorSubject<number>(0);
  
  localStorage:Storage=sessionStorage;

  constructor() { 
    let data= this.localStorage.getItem("cartItem");

    if(data != null){
      this.cartItems=JSON.parse(data);
    }

    this.computeTotal();
  }

  persistCartItem(){
    this.localStorage.setItem("cartItem",JSON.stringify(this.cartItems));
  }

  addToCart(theCartItem: CartItem) {
    
    let alreadyExistingIncart:boolean=false;
    let existingCartItem: CartItem | undefined = new CartItem(0,"", "", 0, 0);

    if(this.cartItems.length >0){

      existingCartItem=this.cartItems.find(tempCartItem => tempCartItem.id ===theCartItem.id);
      if(existingCartItem){
        alreadyExistingIncart=true;
      }

    }

      if(alreadyExistingIncart){
        existingCartItem!.quantity++;
      }else{
        this.cartItems.push(theCartItem);
      }

      this.computeTotal();

  }
  computeTotal() {
   
    let totalPriceValue:number=0.0;
    let totalQuatityvalue:number=0;

    for (let  currentItem of this.cartItems) {
      totalPriceValue += currentItem.unitPrice *currentItem.quantity;
      totalQuatityvalue +=currentItem.quantity;
    }
    
    this.totalPrice.next(totalPriceValue);
    this.totalQuantities.next(totalQuatityvalue);

    this.persistCartItem()

  }

  decrementQuantity(cart: CartItem) {
    cart.quantity--;

    if(cart.quantity == 0){
      this.remove(cart);
    }else{
      this.computeTotal();
    }
  }
  
  remove(cart:CartItem) {
    const index= this.cartItems.findIndex(temp =>temp.id ===cart.id);

    if(index >-1){
      this.cartItems.splice(index,1);
      this.computeTotal();
    }
  }
}
