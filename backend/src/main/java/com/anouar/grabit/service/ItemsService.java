package com.anouar.grabit.service;

import com.anouar.grabit.model.Items;
import com.anouar.grabit.model.Order;

import java.util.List;

public interface ItemsService {

    void saveItem(Items item);

    boolean itemExists(Items item);

    Items findByName(String name);

    List<Items> findByOrders(List<Order> orders);

}
