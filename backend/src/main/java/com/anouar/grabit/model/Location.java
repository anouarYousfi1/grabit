package com.anouar.grabit.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "user",
        "order",
        "longitude",
        "latitude",
        "type"
})

public class Location implements Serializable {

    @JsonProperty("user")
    private Integer user;

    @JsonProperty("order")
    private Integer order;

    @JsonProperty("longitude")
    private Double longitude;

    @JsonProperty("latitude")
    private Double latitude;

    @JsonProperty("type")
    private Integer type;


    public Location(){

    }

    public Location(Integer user, Integer order, Double longitude, Double latitude) {
        this.user = user;
        this.order = order;
        this.longitude = longitude;
        this.latitude = latitude;
    }


    @JsonProperty("user")
    public Integer getUser() {
        return user;
    }

    @JsonProperty("user")
    public void setUser(Integer user) {
        this.user = user;
    }

    @JsonProperty("order")
    public Integer getOrder() {
        return order;
    }

    @JsonProperty("order")
    public void setOrder(Integer order) {
        this.order = order;
    }

    @JsonProperty("longitude")
    public Double getLongtitude() {
        return longitude;
    }
    @JsonProperty("longitude")
    public void setLongtitude(Double longtitude) {
        this.longitude = longtitude;
    }
    @JsonProperty("latitude")
    public Double getLatitude() {
        return latitude;
    }

    @JsonProperty("latitude")
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    @JsonProperty("type")
    public Integer getType() {
        return type;
    }

    @JsonProperty("type")
    public void setType(Integer type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Location{" +
                "user=" + user +
                ", order=" + order +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                ", type=" + type +
                '}';
    }
}
