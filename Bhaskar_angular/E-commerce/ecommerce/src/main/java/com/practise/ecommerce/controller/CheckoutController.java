package com.practise.ecommerce.controller;

import com.practise.ecommerce.dto.PaymentInfo;
import com.practise.ecommerce.dto.Purchase;
import com.practise.ecommerce.dto.PurchaseResponse;
import com.practise.ecommerce.service.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutService service;

    @PostMapping("/save")
    public PurchaseResponse saveCheckout(@RequestBody Purchase purchase){

        PurchaseResponse purchaseResponse = service.purchaseOrder(purchase);
        return  purchaseResponse;
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymnetInfo(@RequestBody PaymentInfo paymentInfo) throws StripeException {
       PaymentIntent intent= service.createPaymentIntent(paymentInfo);
        return  new ResponseEntity<>(intent.toJson(), HttpStatus.OK);
    }
}
