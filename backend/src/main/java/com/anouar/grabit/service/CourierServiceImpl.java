package com.anouar.grabit.service;

import com.anouar.grabit.model.Courier;
import com.anouar.grabit.model.Customer;
import com.anouar.grabit.repository.CourierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public List<Courier> findAll() {
        return repository.findAll();
    }

    @Override
    public boolean courierExists(Courier courier) {
        if (repository.findByEmail(courier.getEmail()) != null)
            return true;

        return false;
    }

    public Courier findCourierById(Integer id) {
        Optional<Courier> courier = repository.findById(id);
        return courier.get();

    }

    @Override
    public Courier findCourierByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public List<Courier> findCouriersByStatus(Boolean status) {
        return repository.findByActif(status);
    }
}
