package com.anouar.grabit.rest;

import com.anouar.grabit.model.Courier;
import com.anouar.grabit.model.Customer;
import com.anouar.grabit.model.Items;
import com.anouar.grabit.model.Order;
import com.anouar.grabit.service.CourierService;
import com.anouar.grabit.service.CustomerService;
import com.anouar.grabit.service.ItemsService;
import com.anouar.grabit.service.OrderService;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
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

        List<Order> orders = orderService.getMyOrders(customer);

        if(orders != null && !orders.isEmpty())
            return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }


    @PostMapping("/customer/save")
    public ResponseEntity<List<Order>> save(@RequestBody Order order) {
        Courier courierId = null;
        List<Items> items = new ArrayList<>();

        LOG.info(order.toString());

        Customer customerId  = customerService.findCustomerByEmail(order.getCustomerId().getEmail());

        if(order.getCourierId() != null)
            courierId = courierService.findCourierById(order.getCourierId().getId());

        order.setCustomerId(customerId);
        order.setCourierId(courierId);

        for (Items item: order.getItems()) {
            if(!itemsService.itemExists(item)) {
                itemsService.saveItem(item);
                items.add(item);
            }
            else {
                Items fetchedItem = itemsService.findByName(item.getName());
                items.add(fetchedItem);
            }
        }

        order.setItems(items);

        System.out.println(order.toString());

        orderService.saveOrder(order);


        return new ResponseEntity<>(null, HttpStatus.OK);
    }


}
