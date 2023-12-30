package com.practise.ecommerce.dao;


import com.practise.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface CustomerRepository extends JpaRepository<Customer,Long> {

    Customer findByEmail(String email);
}
