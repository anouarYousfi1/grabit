package com.anouar.grabit.repository;

import com.anouar.grabit.model.Courier;
import com.anouar.grabit.model.Customer;
import com.anouar.grabit.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findByCustomerId(Customer customerId);

    List<Order> findByCourierId(Courier courierId);

    List<Order> findByCustomerIdAndStatusLike(Customer customerId, String status);

    List<Order> findByCourierIdAndStatusLike(Courier courier, String status);

}
