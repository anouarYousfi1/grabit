package com.anouar.grabit.repository;

import com.anouar.grabit.model.Items;
import com.anouar.grabit.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemsRepository extends JpaRepository<Items, Integer> {
    Items findByName(String name);

    List<Items> findByOrdersIn(List<Order> orders);

}
