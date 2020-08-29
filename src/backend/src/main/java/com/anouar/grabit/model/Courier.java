package com.anouar.grabit.model;



import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@DiscriminatorValue("2")
public class Courier extends User {

    @OneToMany(mappedBy = "courier")
    private List<Order> deliveries;

    @Override
    public String toString() {
        return super.toString();
    }
}
