import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {


  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartDetails();
  }
  getCartDetails() {

    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data
      }
    )

    this.cartService.totalQuantities.subscribe(
      data => {
        this.totalQuantity = data
      }
    )

    this.cartService.computeTotal();
  }

  incrementCart(cart: CartItem) {
    this.cartService.addToCart(cart);
  }

  decrementCart(cart: CartItem) {
    this.cartService.decrementQuantity(cart);
  }

  remove(cart: CartItem) {
    this.cartService.remove(cart);
  }



}
