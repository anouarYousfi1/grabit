package com.anouar.grabit.service;

import com.anouar.grabit.model.Items;

public interface ItemsService {

    void saveItem(Items item);

    boolean itemExists(Items item);

    Items findByName(String name);
}
