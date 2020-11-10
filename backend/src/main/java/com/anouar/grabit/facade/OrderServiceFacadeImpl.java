package com.anouar.grabit.facade;

import com.anouar.grabit.model.*;
import com.anouar.grabit.service.CourierService;
import com.anouar.grabit.service.CustomerService;
import com.anouar.grabit.service.ItemsService;
import com.anouar.grabit.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceFacadeImpl implements OrderServiceFacade {


    @Autowired
    CustomerService customerService;

    @Autowired
    CourierService courierService;

    @Autowired
    OrderService orderService;

    @Autowired
    ItemsService itemsService;


    @Override
    public void placeOrder(Order order) {
        Courier courierId = null;
        List<Items> items = new ArrayList<>();
        List<Items> foundItems = new ArrayList<>();
        List<Order> orders = new ArrayList<>();


        Customer customerId = customerService.findCustomerByEmail(order.getCustomerId().getEmail());

        if (order.getCourierId() != null)
            courierId = courierService.findCourierById(order.getCourierId().getId());

        order.setCustomerId(customerId);
        order.setCourierId(courierId);


        saveAndRetrieveItems(order, items);


        order.setItems(items);
        System.out.println(order.toString());

        orderService.saveOrder(order);


    }

    private void saveAndRetrieveItems(@RequestBody Order order, List<Items> items) {
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
    }

    public ResponseEntity<List<Order>> getCustomerOrders(Customer customer){
        Customer customerWhoOrdered = customerService.findCustomerById(customer.getId());
        return getListOrders(orderService.getMyOrders(customerWhoOrdered), customerWhoOrdered);
    }

    @Override
    public ResponseEntity<List<Order>> getCourierOrders(Courier courier) {
        Courier courierWhoOrdered = courierService.findCourierById(courier.getId());
        return getListOrders(orderService.getMyOrders(courierWhoOrdered), courierWhoOrdered);
    }

    @Override
    public void setOrderStatus(Order order) {
        Order orderToSet = orderService.findOrderById(order.getId());

        if(orderToSet != null) {
            orderToSet.setStatus(order.getStatus());
            orderService.saveOrder(orderToSet);
        }
    }

    @Override
    public ResponseEntity<Order> getOrderStatus(Order order) {
        Order orderToGet = null;


        orderToGet = orderService.findOrderById(order.getId());

        if(orderToGet == null)
            return new ResponseEntity<>(null, HttpStatus.OK);
        else
            return new ResponseEntity<Order>(orderToGet, HttpStatus.OK);

    }

    @Override
    public ResponseEntity<List<Order>> getCustomerOrdersByStatus(Customer customer, String status) {
        Customer customerToFind = customerService.findCustomerById(customer.getId());
        if(status == "null")
            return getListOrders(orderService.getOrdersByStatus(customerToFind, null), customerToFind);

        return getListOrders(orderService.getOrdersByStatus(customerToFind, status), customerToFind);
    }

    @Override
    public ResponseEntity<List<Order>> getCourierOrdersByStatus(Courier courier, String status) {
        Courier courierToFind = courierService.findCourierById(courier.getId());
        if(status == "null")
            return getListOrders(orderService.getOrdersByStatus(courierToFind, null), courierToFind);

        return getListOrders(orderService.getOrdersByStatus(courierToFind, status), courierToFind);
    }

    private ResponseEntity<List<Order>> getListOrders(List<Order> myOrders, @RequestBody User user) {
        List<Order> orders = myOrders;

        if(orders != null && !orders.isEmpty())
            return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
