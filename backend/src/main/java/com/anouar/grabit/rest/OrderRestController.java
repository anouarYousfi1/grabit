package com.anouar.grabit.rest;

import com.anouar.grabit.model.*;
import com.anouar.grabit.service.CourierService;
import com.anouar.grabit.service.CustomerService;
import com.anouar.grabit.service.ItemsService;
import com.anouar.grabit.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type", allowCredentials = "true")
@RequestMapping("api/orders")

public class OrderRestController {

    @Autowired
    OrderService orderService;

    @Autowired
    CustomerService customerService;

    @Autowired
    CourierService courierService;

    @Autowired
    ItemsService itemsService;

    

    private Logger LOG = Logger.getLogger(this.getClass().getName());


    @PostMapping("/customer")
    public ResponseEntity<List<Order>> getMyOrders(@RequestBody Customer customer) {
        Customer customerWhoOrdered = customerService.findCustomerById(customer.getId());
        return getListOrders(orderService.getMyOrders(customerWhoOrdered), customerWhoOrdered);
    }

    @PostMapping("/driver")
    public ResponseEntity<List<Order>> getMyOrders(@RequestBody Courier courier) {

        Courier courierWhoOrdered = courierService.findCourierById(courier.getId());
        return getListOrders(orderService.getMyOrders(courierWhoOrdered), courierWhoOrdered);
    }

    @PostMapping("/customer/save")
    public ResponseEntity<List<Order>> save(@RequestBody Order order) {
        Courier courierId = null;
        List<Items> items = new ArrayList<>();
        List<Items> foundItems = new ArrayList<>();
        List<Order> orders = new ArrayList<>();

        LOG.info(order.toString());

        Customer customerId = customerService.findCustomerByEmail(order.getCustomerId().getEmail());

        if (order.getCourierId() != null)
            courierId = courierService.findCourierById(order.getCourierId().getId());

        order.setCustomerId(customerId);
        order.setCourierId(courierId);


        for (Items item : order.getItems()) {
            if (!itemsService.itemExists(item)) {
                itemsService.saveItem(item);
                Items fetchedItem = itemsService.findByName(item.getName());
                items.add(fetchedItem);
            } else {
                Items fetchedItem = itemsService.findByName(item.getName());
                items.add(fetchedItem);

            }
        }


            order.setItems(items);
            System.out.println(order.toString());

            orderService.saveOrder(order);


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

        Order orderToSet = orderService.findOrderById(order.getId());

        LOG.info(String.valueOf(order.getId()) );
        LOG.info(order.getStatus());


        if(orderToSet != null) {
            orderToSet.setStatus(order.getStatus());
            orderService.saveOrder(orderToSet);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }


    @PostMapping("/getOrderState")
    public ResponseEntity<Order> getOrderStatus(@RequestBody Order order){

        Order orderToGet = null;


        orderToGet = orderService.findOrderById(order.getId());

        if(orderToGet == null)
            return new ResponseEntity<>(null, HttpStatus.OK);
        else
            return new ResponseEntity<Order>(orderToGet, HttpStatus.OK);


    }

    // getting orders By Status

    @PostMapping("/customer/getOrders/{status}")
    public ResponseEntity<List<Order>> getPickedUpOrders(@RequestBody Customer customer, @PathVariable("status") String status ){

        Customer customerToFind = customerService.findCustomerById(customer.getId());
        if(status == "null")
            return getListOrders(orderService.getOrdersByStatus(customerToFind, null), customerToFind);

        return getListOrders(orderService.getOrdersByStatus(customerToFind, status), customerToFind);
    }

    @PostMapping("/driver/getOrders/{status}")
    public ResponseEntity<List<Order>> getPickedUpOrders(@RequestBody Courier courier, @PathVariable("status") String status){

        Courier courierToFind = courierService.findCourierById(courier.getId());
        if(status == "null")
            return getListOrders(orderService.getOrdersByStatus(courierToFind, null), courierToFind);

        return getListOrders(orderService.getOrdersByStatus(courierToFind, status), courierToFind);
    }








}
