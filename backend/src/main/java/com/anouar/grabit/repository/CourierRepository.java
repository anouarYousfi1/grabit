package com.anouar.grabit.repository;

import com.anouar.grabit.model.Courier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourierRepository extends JpaRepository<Courier, Integer> {

    Courier findByEmail(String email);

    List<Courier> findByActif(Boolean actif);

}
