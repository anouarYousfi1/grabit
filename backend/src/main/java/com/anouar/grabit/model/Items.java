package com.anouar.grabit.model;

import org.springframework.core.style.ToStringCreator;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "items")
public class Items extends BaseEntity{


    private String name;
    List<Order> orders;


    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @ManyToMany(mappedBy = "items")
    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    @Override
    public String toString() {
        return new ToStringCreator(this)
                    .append("name", this.name).toString();
    }
}
