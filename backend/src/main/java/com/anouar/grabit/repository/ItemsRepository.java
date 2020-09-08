package com.anouar.grabit.repository;

import com.anouar.grabit.model.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemsRepository extends JpaRepository<Items, Integer> {
    Items findByName(String name);
}
