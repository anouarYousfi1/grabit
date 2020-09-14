package com.anouar.grabit.service;

import com.anouar.grabit.model.Courier;
import com.anouar.grabit.model.Customer;
import com.anouar.grabit.model.Order;
import com.anouar.grabit.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        Optional<Order> order = repository.findById(id);
        if(order !=null)
            return order.get();
        else
            return null;
    }

    @Override
    public List<Order> getOrdersByStatus(Customer customer, String status) {
        return repository.findByCustomerIdAndStatusLike(customer, status);
    }

    @Override
    public List<Order> getOrdersByStatus(Courier courier, String status) {
        return repository.findByCourierIdAndStatusLike(courier, status);
    }


}
