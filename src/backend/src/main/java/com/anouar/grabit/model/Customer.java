package com.anouar.grabit.model;


import org.springframework.context.annotation.Scope;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.List;

@Entity
@DiscriminatorValue("1")
public class Customer extends User implements Serializable {

    @OneToMany(mappedBy = "customer")
    private List<Order> orders;

    @Override
    public String toString() {
        return super.toString();
    }
}
