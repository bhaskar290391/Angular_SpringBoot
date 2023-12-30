package com.practise.ecommerce.service;

import com.practise.ecommerce.dto.PaymentInfo;
import com.practise.ecommerce.dto.Purchase;
import com.practise.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    public PurchaseResponse purchaseOrder(Purchase purchase);

    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
