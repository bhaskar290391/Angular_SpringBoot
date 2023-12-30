
import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { Country } from 'src/app/common/country';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { PaymentInfo } from 'src/app/common/payment-info';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CheckoutServiceService } from 'src/app/services/checkout-service.service';
import { FormService } from 'src/app/services/form.service';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  countries:Country[]=[];
  billingAddressStates:State[]=[];
  shippingAddressStates:State[]=[];

  totalPrice: number = 0;
  totalQuantity: number = 0;
  checkoutForm!: FormGroup;

  creditCardMonth: number[] = [];
  creditCardYears: number[] = [];
  session:Storage=sessionStorage;

  stripe=Stripe(environment.stripePublishableKey);
  cardElement:any;
  displayError:any="";
  paymentInfo:PaymentInfo=new PaymentInfo();
  isDisabled: boolean=false;


  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    private formService: FormService,
    private checkoutService:CheckoutServiceService,
    private router:Router) { }

  ngOnInit(): void {

    this.setUpStripePaymentForm();
    
    const email:string=JSON.parse(this.session.getItem("email")!);
    this.checkoutForm = this.formBuilder.group({

      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, 
                                        Validators.minLength(2),
                                        CustomValidator.notOnlyWhiteSpaces]),
        lastName:  new FormControl('', [Validators.required, 
                                        Validators.minLength(2),
                                        CustomValidator.notOnlyWhiteSpaces]),
        email: new FormControl(email,
                              [Validators.required,
                               Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
                               CustomValidator.notOnlyWhiteSpaces])
      }),
      shipping: this.formBuilder.group({
        street: new FormControl('',
                    [Validators.required,
                    Validators.minLength(2),
                    CustomValidator.notOnlyWhiteSpaces]),
        city: new FormControl('',
                            [Validators.required,
                            Validators.minLength(2),
                            CustomValidator.notOnlyWhiteSpaces]),
        state: new FormControl('',
                              [Validators.required]),
        country: new FormControl('',
                                [Validators.required]),
        zipcode: new FormControl('',
                              [Validators.required,
                              Validators.minLength(2),
                              CustomValidator.notOnlyWhiteSpaces])
      }),
      billing: this.formBuilder.group({
        street: new FormControl('',
                    [Validators.required,
                    Validators.minLength(2),
                    CustomValidator.notOnlyWhiteSpaces]),
        city: new FormControl('',
                            [Validators.required,
                            Validators.minLength(2),
                            CustomValidator.notOnlyWhiteSpaces]),
        state: new FormControl('',
                              [Validators.required]),
        country: new FormControl('',
                                [Validators.required]),
        zipcode: new FormControl('',
                              [Validators.required,
                              Validators.minLength(2),
                              CustomValidator.notOnlyWhiteSpaces])
      }),
      credit: this.formBuilder.group(
        
        {
        // cardType: new FormControl('',
        //                         [Validators.required,
        //                         Validators.minLength(2),
        //                         CustomValidator.notOnlyWhiteSpaces]),
        // nameOnCard: new FormControl('',
        //                           [Validators.required,
        //                           Validators.minLength(2),
        //                           CustomValidator.notOnlyWhiteSpaces]),
        // cardNumber: new FormControl('',
        //                           [Validators.required,
        //                           Validators.pattern('[0-9]{16}')]),
        // cvv: new FormControl('',
        //                         [Validators.required,
        //                         Validators.pattern('[0-9]{3}')]),
        // expiryMonth: [''],
        // expiryYear: ['']
      }
      
      ),
    })

    // let currentMonth: number = new Date().getMonth() + 1;

    // this.formService.getCreditCardMonths(currentMonth).subscribe(data => {
    //   this.creditCardMonth = data;
    // });

    // this.formService.getCreditCardYears().subscribe(data => {
    //   this.creditCardYears = data;
    // });


    this.formService.getCountries().subscribe(response =>{
      this.countries=response;
    })

    this.reviewCartDetails();
  }
  setUpStripePaymentForm() {
     var elements=this.stripe.elements();

     this.cardElement=elements.create("card",{hidePostalCode:true})

     this.cardElement.mount("#card-element");

     this.cardElement.on("change",(event:any)=>{

      this.displayError=document.getElementById("card-error");

      if(event.complete){
        this.displayError.textContent="";
      }else if (event.error){
        this.displayError.textContent=event.error.message;
      }
     })
  }
  reviewCartDetails() {
    
    this.cartService.totalPrice.subscribe(data =>{
      this.totalPrice=data;
    });

    this.cartService.totalQuantities.subscribe(data =>{
      this.totalQuantity=data;
    })
  }

  getState(formGroup:any){
    debugger;
    const formGroupValue=this.checkoutForm.get(formGroup)!;
    const countryCode=formGroupValue.value.country.code;

    if(formGroup ==="billing"){

      this.formService.getStates(countryCode).subscribe(data=>{
        this.billingAddressStates=data;
        formGroupValue.get("state")!.setValue(data[0])
      })
      
      
    }else{
      this.formService.getStates(countryCode).subscribe(data=>{
        this.shippingAddressStates=data;
        formGroupValue.get("state")!.setValue(data[0])
      })
    }

    
  }

  onSubmit() {


    if(this.checkoutForm.invalid){
      this.checkoutForm.markAllAsTouched();
      return false;
    }

    let order=new Order();
    order.totalPrice=this.totalPrice;
    order.totalQuantity=this.totalQuantity;

    let cartItems=this.cartService.cartItems;

    let orderItem:OrderItem[]=[]
    for (let i=0;i<cartItems.length;i++) {
      orderItem[i]=new OrderItem(cartItems[i]);
    }

    let customer :Customer=this.checkoutForm.controls['customer'].value;

    let purchase =new Purchase;

     // populate purchase - shipping address
     purchase.shippingAddress = this.checkoutForm.controls['shipping'].value;
     const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
     const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
     purchase.shippingAddress.state = shippingState.name;
     purchase.shippingAddress.country = shippingCountry.name;
 
     // populate purchase - billing address
     purchase.billingAddress = this.checkoutForm.controls['billing'].value;
     const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
     const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
     purchase.billingAddress.state = billingState.name;
     purchase.billingAddress.country = billingCountry.name;
   
     purchase.order=order;
     purchase.orderItem=orderItem;
     purchase.customer=customer;

     this.paymentInfo.amount=this.totalPrice *100;
     this.paymentInfo.currency="USD";
     this.paymentInfo.emailReceipt=purchase.customer.email;


     if(!this.checkoutForm.invalid && this.displayError.textContent ==""){
      this.isDisabled=true;
        this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
          response =>{
            this.stripe.confirmCardPayment(response.client_secret,{
              payment_method:{
                card: this.cardElement,
                billing_details:{
                  email:purchase.customer.email,
                  name:purchase.customer.firstName+" "+purchase.customer.lastName,
                  address:{
                    line1:purchase.billingAddress.street,
                    city:purchase.billingAddress.city,
                    state:purchase.billingAddress.state,
                    postal_code:purchase.billingAddress.zipCode,
                    country:this.billingCountry?.value.code

                  }
                }
              }
            },{handleActions:false}).then(

             ( result:any ) =>{

              if(result.error){
                alert("Error :"+result.error.message);
                this.isDisabled=false;
              }else{
                
               this.checkoutService.saveCheckoutForm(purchase).subscribe({
                next:Response=>{
                  alert("The tracking number is "+Response.orderTrackingNumber);
                  this.isDisabled=false;
                  this.resetCart();

                },
                error:err=>{
                  alert("The error is "+err.message);
                  this.isDisabled=false;
                }
              })
              }
             }
            )
          }
        )
     }else{
      this.checkoutForm.markAllAsTouched();
      return;
     }

  }
  resetCart() {
    this.cartService.cartItems=[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantities.next(0)
    this.cartService.persistCartItem();
    this.checkoutForm.reset();
    this.router.navigateByUrl("/products");
  }

  copyShippingAddressToBillingAddress(event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    console.log(isChecked)

    debugger;
    if (isChecked) {
      this.checkoutForm.controls['billing']
        .setValue(this.checkoutForm.controls['shipping'].value);

       this.billingAddressStates=this.shippingAddressStates; 
    }
    else {
      this.checkoutForm.controls['billing'].reset();
      this.billingAddressStates=[];
    }

  }

  handleMonthAndYears() {
    debugger;
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = this.checkoutForm.controls.credit.get('expiryYear')!.value;
    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(data=>{
      this.creditCardMonth=data;
    })

  }


  //form Getter method
  get firstName(){return this.checkoutForm.get('customer.firstName');}

  get lastName(){return this.checkoutForm.get('customer.lastName');}

  get email(){return this.checkoutForm.get('customer.email');}


  get shippingStreet(){return this.checkoutForm.get('shipping.street');}
  get shippingCity(){return this.checkoutForm.get('shipping.city');}
  get shippingState(){return this.checkoutForm.get('shipping.state');}
  get shippingCountry(){return this.checkoutForm.get('shipping.country');}
  get shippingZipcode(){return this.checkoutForm.get('shipping.zipcode');}

  get billingStreet(){return this.checkoutForm.get('billing.street');}
  get billingCity(){return this.checkoutForm.get('billing.city');}
  get billingState(){return this.checkoutForm.get('billing.state');}
  get billingCountry(){return this.checkoutForm.get('billing.country');}
  get billingZipcode(){return this.checkoutForm.get('billing.zipcode');}

  get cardType(){return this.checkoutForm.get('credit.cardType');}
  get cardName(){return this.checkoutForm.get('credit.nameOnCard');}
  get cardNumber(){return this.checkoutForm.get('credit.cardNumber');}
  get cardCVV(){return this.checkoutForm.get('credit.cvv');}
}
