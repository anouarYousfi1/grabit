package com.anouar.grabit.repository;

import com.anouar.grabit.model.Courier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CourierRepository extends JpaRepository<Courier, Long> {

    Courier findByEmail(String email);

}
