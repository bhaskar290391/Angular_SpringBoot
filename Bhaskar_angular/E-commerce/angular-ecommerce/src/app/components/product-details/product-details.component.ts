import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {



  product!: Product;
  constructor(private route:ActivatedRoute,private productService:ProductService,
    private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.getProduct();
    });
  }

  getProduct() {
  const productId:number=Number(this.route.snapshot.paramMap.get("id"));  
  this.productService.getProduct(productId).subscribe(
    data=>{
      this.product=data;
    }
  )  
    
  }


  addToCart(){
    console.log("The product Detail :"+this.product.name +" "+this.product.unitPrice);

    const cartItem=new CartItem(this.product.id,
      this.product.name,this.product.imageUrl,this.product.unitPrice,1);

    this.cartService.addToCart(cartItem);
  }

}
