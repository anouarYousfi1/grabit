package com.anouar.grabit.rest;

import com.anouar.grabit.model.Customer;
import com.anouar.grabit.model.User;
import com.anouar.grabit.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type", allowCredentials = "true")
@RequestMapping("api/customers")
public class CustomerRestController {


    @Autowired
    CustomerService service;


    private Logger LOG = Logger.getLogger(this.getClass().getName());

    private static String KEY = "CUSTOMERS";

    @PostMapping("/save")
    public ResponseEntity<String> saveCustomer(@RequestBody Customer customer, HttpServletRequest request)
    {


        if(!service.customerExists(customer)){

            service.saveCustomer(customer);

            UserRestController.generateSession(request, KEY, customer);


        } else {
            return new ResponseEntity<String>("User with this email already exists", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(null, HttpStatus.OK);
    }





}
