package com.anouar.grabit.service;

import com.anouar.grabit.model.Courier;
import java.util.List;

public interface CourierService {

    void saveCourier(Courier courier);

    List<Courier> findAll();

    boolean courierExists(Courier courier);


    Courier findCourierById(Integer id);

    Courier findCourierByEmail(String email);

}
