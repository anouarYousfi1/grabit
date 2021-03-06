package com.anouar.grabit.service;

import com.anouar.grabit.model.Items;
import com.anouar.grabit.model.Order;
import com.anouar.grabit.repository.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemsServiceImpl implements ItemsService{

    @Autowired
    ItemsRepository repository;


    @Override
    public void saveItem(Items item) {
        repository.save(item);
    }

    @Override
    public boolean itemExists(Items item) {

        if(repository.findByName(item.getName()) != null)
            return true;

        return false;
    }

    @Override
    public Items findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public List<Items> findByOrders(List<Order> orders) {
        return repository.findByOrdersIn(orders);
    }
}
