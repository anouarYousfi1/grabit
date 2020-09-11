package com.anouar.grabit.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.List;

@Entity
@DiscriminatorValue("1")
public class Customer extends User implements Serializable {

    private List<Order> orders;

    public Customer() {
        super();
    }

    @OneToMany(mappedBy = "customerId", fetch = FetchType.LAZY)
    @JsonIgnore
    public List<Order> getOrders() {
        return orders;
    }

    @JsonProperty("orders")
    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
