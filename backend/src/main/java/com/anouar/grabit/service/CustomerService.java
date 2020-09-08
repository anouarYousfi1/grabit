package com.anouar.grabit.service;


import com.anouar.grabit.model.Customer;

import java.io.Serializable;
import java.util.List;

public interface CustomerService  {

    void saveCustomer(Customer customer);

    List<Customer> findAll();

    boolean customerExists(Customer customer);

    Customer findCustomerById(Integer id);

    Customer findCustomerByEmail(String email);
}
