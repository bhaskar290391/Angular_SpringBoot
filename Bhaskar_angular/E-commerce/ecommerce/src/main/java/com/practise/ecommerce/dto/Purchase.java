package com.practise.ecommerce.dto;

import com.practise.ecommerce.entity.Address;
import com.practise.ecommerce.entity.Customer;
import com.practise.ecommerce.entity.Order;
import com.practise.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private  Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItem;
}
