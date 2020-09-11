package com.anouar.grabit.service;

import com.anouar.grabit.model.Courier;
import com.anouar.grabit.model.Customer;
import com.anouar.grabit.model.Order;
import com.anouar.grabit.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    OrderRepository repository;

    @Override
    public void saveOrder(Order order) {
        repository.save(order);
    }

    @Override
    public List<Order> getMyOrders(Customer customer) {
        return repository.findByCustomerId(customer);
    }

    @Override
    public List<Order> getMyOrders(Courier courier) {
        return repository.findByCourierId(courier);
    }

    @Override
    public Order findOrderById(Integer id) {
        return repository.findById(id).get();
    }
}
