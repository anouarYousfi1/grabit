package com.anouar.grabit.repository;


import com.anouar.grabit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    List<User> findAll();

    List<User> findAllByFullName(String fullname);

    User findByEmail(String email);

    User findByEmailAndPassword(String email, String password);

}
