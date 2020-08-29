package com.anouar.grabit.service;

import com.anouar.grabit.model.Customer;
import com.anouar.grabit.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository repository;


    @Override
    public void saveCustomer(Customer customer) {
        repository.save(customer);
    }

    @Override
    public List<Customer> findAll() {
        return repository.findAll();
    }

    @Override
    public boolean customerExists(Customer customer) {

        if(repository.findByEmail(customer.getEmail()) != null)
            return true;

        return false;
    }


}
