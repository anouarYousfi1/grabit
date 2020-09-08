package com.anouar.grabit.service;

import com.anouar.grabit.model.Courier;
import com.anouar.grabit.model.Customer;

public interface CourierService {

    void saveCourier(Courier courier);

    Courier findCourierById(Integer id);



}
