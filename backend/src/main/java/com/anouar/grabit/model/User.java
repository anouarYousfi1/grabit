package com.anouar.grabit.model;


import org.springframework.context.annotation.Scope;
import org.springframework.core.style.ToStringCreator;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;


@Entity
@Table(name = "user")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="user_type",
        discriminatorType = DiscriminatorType.INTEGER)

public class User extends BaseEntity implements Serializable {
    @Column(name = "fullname")
    @NotEmpty
    private String fullName;

    @Column(name = "address")
    @NotEmpty
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "telephone")
    @Digits(fraction = 0, integer = 10)

    private String telephone;
    @Column(name = "email")
    @NotEmpty

    private String email;
    @Column(name = "password")
    @NotEmpty

    private String password;
    @Column(name = "picture")

    private String picture;

    public User() {
        super();
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullname) {
        this.fullName = fullname;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    @Override
    public String toString() {
        return new ToStringCreator(this)
                .append("id", this.getId())
                .append("fullname", this.getFullName())
                .append("address", this.getAddress())
                .append("city", this.getCity())
                .append("phone", this.getTelephone())
                .append("email", this.getEmail())
                .append("pictureUrl", this.getPicture()).toString();
    }
}
