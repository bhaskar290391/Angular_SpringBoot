import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from "src/app/services/product.service";
import {ActivatedRoute} from "@angular/router"
import { CartService } from 'src/app/cart.service';
import { CartItem } from 'src/app/common/cart-item';
 
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products:Product[]=[];
  categoryId:number=1;
  searchMode:boolean=false;

  //for pagination
  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElement:number=0;
  thePreviousCategory:number=1;
  thePreviousKeyword:string|null="";
  
  constructor(private productService:ProductService,
    private cartService:CartService,
    private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.productList();
    }
    );

  }

  productList() {
    debugger;
    this.searchMode=this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){

      this.handleSearchProduct();

    }else{
      this.handleListproduct();
    }
  }

  handleSearchProduct(){
    
    const value:string|null=this.route.snapshot.paramMap.get('keyword');

    if(this.thePreviousKeyword !=value){
      this.thePageNumber=1;
    }

    this.thePreviousKeyword=value;

    this.productService.searchProductByKeywordPaginate(this.thePageNumber-1,this.thePageSize,value).subscribe(
      data=>{
       
        this.products=data._embedded.products;
        this.thePageNumber=data.page.number+1;
        this.thePageSize=data.page.size;
        this.theTotalElement=data.page.totalElements;
      }
    )
  }

  handleListproduct(){

    debugger;
    const checkCategoryId=this.route.snapshot.paramMap.has("id");

    if(checkCategoryId){
      this.categoryId=Number(this.route.snapshot.paramMap.get("id"));
    }else{
      this.categoryId=1;
    }

    if(this.thePreviousCategory !=this.categoryId){
      this.thePageNumber=1;
    }

    this.thePreviousCategory=this.categoryId;

    this.productService.getProductListByPaginate(this.thePageNumber-1,this.categoryId,this.thePageSize).subscribe(
      data=>{
       
        this.products=data._embedded.products;
        this.thePageNumber=data.page.number+1;
        this.thePageSize=data.page.size;
        this.theTotalElement=data.page.totalElements;
      }
    )
  }

  updatePageSize(pageSize: any) {
    this.thePageSize=pageSize;
    this.thePageNumber=1;
    this.productList();
  }

  addToCart(theProduct:Product){
    console.log("The product Detail :"+theProduct.name +" "+theProduct.unitPrice);

    const cartItem=new CartItem(theProduct.id,
      theProduct.name,theProduct.imageUrl,theProduct.unitPrice,1);

    this.cartService.addToCart(cartItem);
  }
  
}

