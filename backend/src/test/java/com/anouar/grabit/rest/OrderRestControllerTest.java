package com.anouar.grabit.rest;

import com.anouar.grabit.facade.OrderServiceFacade;
import com.anouar.grabit.model.Customer;
import com.anouar.grabit.model.Order;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestInstance(value = TestInstance.Lifecycle.PER_CLASS)
public class OrderRestControllerTest {

    @InjectMocks
    OrderRestController orderRestController;

    @Mock
    OrderServiceFacade orderServiceFacade;

    @BeforeAll
    public void init(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void shouldGetCustomersOrders(){
        Customer customer = new Customer();
        when(orderServiceFacade.getCustomerOrders(customer)).thenReturn(new ResponseEntity<List<Order>>(new ArrayList<>(), HttpStatus.OK));

        assertEquals(HttpStatus.OK,orderRestController.getMyOrders(customer).getStatusCode());
        assertEquals(Arrays.asList(), orderRestController.getMyOrders(customer).getBody());
    }

}
