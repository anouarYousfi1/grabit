package com.anouar.grabit.service;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CustomerServiceTest {

    @Autowired
    CustomerService customerService;


    @Test
    public void shouldGetCustomerById(){
        assertNotEquals(null, customerService.findCustomerById(62));
    }


}
