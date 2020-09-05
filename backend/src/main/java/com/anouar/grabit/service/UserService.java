package com.anouar.grabit.service;


import com.anouar.grabit.model.User;

import java.util.List;

public interface UserService {

    void saveUser(User user);

    List<User> findAll();

    User findUser(String email);
}
