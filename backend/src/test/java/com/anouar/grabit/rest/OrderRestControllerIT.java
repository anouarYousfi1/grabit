package com.anouar.grabit.rest;

import com.anouar.grabit.model.Customer;
import com.anouar.grabit.model.Order;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestInstance(value = TestInstance.Lifecycle.PER_CLASS)
public class OrderRestControllerIT {

    @Autowired
    OrderRestController orderRestController;

    Customer customer;

    @BeforeAll
    public void init(){
        customer = new Customer();
        customer.setId(62);
    }

    @Test
    public void shouldGetThreeCustomerOrders(){
        ResponseEntity<List<Order>> orders = orderRestController.getMyOrders(customer);
        assertNotEquals(null,orders);
        assertEquals(3, orders.getBody().size());
    }



}
