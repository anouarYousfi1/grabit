package com.anouar.grabit.service;

import com.anouar.grabit.model.Courier;
import com.anouar.grabit.model.Customer;
import com.anouar.grabit.model.Order;

import java.util.List;

public interface OrderService {


    void saveOrder(Order order);

    List<Order> getMyOrders(Customer customer);

    List<Order> getMyOrders(Courier courier);
}
