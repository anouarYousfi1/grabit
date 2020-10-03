package com.anouar.grabit.rest;
import com.anouar.grabit.model.Items;
import com.anouar.grabit.model.Order;
import com.anouar.grabit.service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type", allowCredentials = "true")
@RequestMapping("api/items")

public class ItemsRestController {

    @Autowired
    ItemsService ItemsService;

    @PostMapping("/getByOrders")
    public ResponseEntity<List<Items>> findByOrders(@RequestBody List<Order> orders) {
        List<Items> items = ItemsService.findByOrders(orders);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }



}
