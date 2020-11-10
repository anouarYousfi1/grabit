package com.anouar.grabit.facade;

import com.anouar.grabit.model.Courier;
import com.anouar.grabit.model.Customer;
import com.anouar.grabit.model.Order;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderServiceFacade {

    void placeOrder(Order order);
    ResponseEntity<List<Order>> getCustomerOrders(Customer customer);
    ResponseEntity<List<Order>> getCourierOrders(Courier courier);
    void setOrderStatus(Order order);
    ResponseEntity<Order> getOrderStatus(Order order);
    ResponseEntity<List<Order>> getCustomerOrdersByStatus(Customer customer, String status);
    ResponseEntity<List<Order>> getCourierOrdersByStatus(Courier courier, String status);

}
