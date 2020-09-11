package com.anouar.grabit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.lang.annotation.Annotation;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order extends BaseEntity implements Serializable{

    private String description;

    /**
     * update :  false and insertable : false because it's not the responsibility of Order to insert these two columns
     */

   private Customer customerId;


    private Courier courierId;



    private String time;

    private Date date;

    private Integer cost;


    private String source;


    private String destination;


    List<Items> items;

    private String status;


    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToOne
    @JoinColumn(name = "customerId", referencedColumnName = "id" , nullable = false)

    public Customer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Customer customerId) {
        this.customerId = customerId;
    }

    @ManyToOne
    @JoinColumn(name = "courierId", referencedColumnName = "id")

    public Courier getCourierId() {
        return courierId;
    }

    public void setCourierId(Courier courierId) {
        this.courierId = courierId;
    }


    @Column(name = "time")

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
    @Column(name = "date")

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Column(name = "cost")
    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    @Column(name = "source")
    @NotEmpty
    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    @Column(name = "destination")
    @NotEmpty
    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    @ManyToMany
    @JoinTable(
            name = "order_items",
            joinColumns = @JoinColumn(name = "order_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "item_id", referencedColumnName = "id"))
    @JsonIgnore
    public List<Items> getItems() {
        return items;
    }

    @JsonProperty
    public void setItems(List<Items> items) {
        this.items = items;
    }


    @Column(name = "status")
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Order{" +
                "description='" + description + '\'' +
                ", client=" + String.valueOf(customerId) +
                ", driver=" + String.valueOf(courierId) +
                ", time='" + time + '\'' +
                ", date=" + date +
                ", cost=" + cost +
                ", source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", items = "+ items.toString() +
                '}';
    }

}

