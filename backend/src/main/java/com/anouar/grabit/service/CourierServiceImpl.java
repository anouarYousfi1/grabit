package com.anouar.grabit.service;

import com.anouar.grabit.model.Courier;
import com.anouar.grabit.model.Customer;
import com.anouar.grabit.repository.CourierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CourierServiceImpl implements CourierService{

    @Autowired
    CourierRepository repository;

    @Override
    public void saveCourier(Courier courier) {
        repository.save(courier);
    }

    @Override
    public Courier findCourierById(Integer id) {
        Optional<Courier> courier = repository.findById(id);
        return courier.get();
    }
}
