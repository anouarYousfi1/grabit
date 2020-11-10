package com.anouar.grabit.rest;

import com.anouar.grabit.facade.OrderServiceFacade;
import com.anouar.grabit.model.*;
import com.anouar.grabit.service.CourierService;
import com.anouar.grabit.service.CustomerService;
import com.anouar.grabit.service.ItemsService;
import com.anouar.grabit.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.logging.Logger;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type", allowCredentials = "true")
@RequestMapping("api/orders")

public class OrderRestController {

    @Autowired
    OrderServiceFacade facade;



    private Logger LOG = Logger.getLogger(this.getClass().getName());


    @PostMapping("/customer")
    public ResponseEntity<List<Order>> getMyOrders(@RequestBody Customer customer) {
        return facade.getCustomerOrders(customer);
    }

    @PostMapping("/driver")
    public ResponseEntity<List<Order>> getMyOrders(@RequestBody Courier courier) {
        return facade.getCourierOrders(courier);
    }

    @PostMapping("/customer/save")
    public ResponseEntity<List<Order>> save(@RequestBody Order order) {

        facade.placeOrder(order);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }


    private ResponseEntity<List<Order>> getListOrders(List<Order> myOrders, @RequestBody User user) {
        List<Order> orders = myOrders;

        if(orders != null && !orders.isEmpty())
            return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }


    @PostMapping("/setOrderState")
    public ResponseEntity<String> setOrder(@RequestBody Order order){

        facade.setOrderStatus(order);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }


    @PostMapping("/getOrderState")
    public ResponseEntity<Order> getOrderStatus(@RequestBody Order order){

       return facade.getOrderStatus(order);

    }

    // getting orders By Status

    @PostMapping("/customer/getOrders/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@RequestBody Customer customer, @PathVariable("status") String status ){

      return facade.getCustomerOrdersByStatus(customer, status);
    }

    @PostMapping("/driver/getOrders/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@RequestBody Courier courier, @PathVariable("status") String status){

      return facade.getCourierOrdersByStatus(courier, status);
    }

}
