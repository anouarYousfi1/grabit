package com.anouar.grabit.rest;

import com.anouar.grabit.model.Customer;
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

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type")
@RequestMapping("api/customers")
public class CustomerRestController {


    @Autowired
    CustomerService service;

    private static String KEY = "CUSTOMERS";

    @GetMapping("/")
    public String getCustomers( HttpSession session) {
        String email= (String) session.getAttribute(KEY);
        if(email == null) {
            System.out.println("null");
        }else {
            System.out.println(email);
        }

        return "index";
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveCustomer(@RequestBody Customer customer, HttpServletRequest request)
    {

        if(!service.customerExists(customer)){

            service.saveCustomer(customer);
            String email = (String) request.getSession().getAttribute(KEY);
            if(email == null) {
                email = customer.getEmail();
                request.getSession().setAttribute(KEY, email);
            }
            login(customer, request);

        } else {
            return new ResponseEntity<String>("User with this email already exists", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Customer customer, HttpServletRequest request)
    {
        String email = (String) request.getSession().getAttribute(KEY);
        if(email.equals(customer.getEmail())) {
                return new ResponseEntity<String>(email, HttpStatus.OK);
        }


            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
    }

}
