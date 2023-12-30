import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl:string;
    quantity:number;
    unitPrice:number;
    productId:number;

    constructor(cart:CartItem){
        this.imageUrl=cart.imageUrl;
        this.quantity=cart.quantity;
        this.unitPrice=cart.unitPrice;
        this.productId=cart.id;
    }
}
