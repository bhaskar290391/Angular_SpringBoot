package com.practise.ecommerce.service;

import com.practise.ecommerce.dao.CustomerRepository;
import com.practise.ecommerce.dto.PaymentInfo;
import com.practise.ecommerce.dto.Purchase;
import com.practise.ecommerce.dto.PurchaseResponse;
import com.practise.ecommerce.entity.Customer;
import com.practise.ecommerce.entity.Order;
import com.practise.ecommerce.entity.OrderItem;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CheckoutServiceImpl implements  CheckoutService{

    @Autowired
    private CustomerRepository customerRepo;

    public CheckoutServiceImpl(CustomerRepository customerRepo, @Value("${stripe.key.secret}") String secretKey) {
        this.customerRepo = customerRepo;
        Stripe.apiKey=secretKey;
    }

    @Override
    public PurchaseResponse purchaseOrder(Purchase purchase) {

        Order order=purchase.getOrder();

        String orderTrackingNumber=GenerateOrdertracking();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItem = purchase.getOrderItem();

        for (OrderItem item: orderItem) {
          order.addItem(item);
        }

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());



        Customer customer=purchase.getCustomer();

        Customer dbCustomer= customerRepo.findByEmail(customer.getEmail());

        if(dbCustomer !=null){
            customer=dbCustomer;
        }
        
        customer.addOrder(order);
        customerRepo.save(customer);
        return new PurchaseResponse(orderTrackingNumber);
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {

        List<String> paymentMethodType=new ArrayList<>();
        paymentMethodType.add("card");
        Map<String,Object> params=new HashMap<>();
        params.put("amount",paymentInfo.getAmount());
        params.put("currency",paymentInfo.getCurrency());
        params.put("payment_method_types",paymentMethodType);
        params.put("description","Bhaskar Shopping Cart");
        params.put("receipt_email",paymentInfo.getEmailReceipt());
        return PaymentIntent.create(params);
    }

    private String GenerateOrdertracking() {

        return UUID.randomUUID().toString();
    }
}
