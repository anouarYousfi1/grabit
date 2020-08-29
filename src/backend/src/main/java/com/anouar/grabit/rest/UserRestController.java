package com.anouar.grabit.rest;

import com.anouar.grabit.model.User;
import com.anouar.grabit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type")
@RequestMapping(value="api/users")
public class UserRestController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/hello")
    public ResponseEntity<List<User>> sayHello() {

        List<User> users = userService.findAll();


        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

    }


    @PostMapping(path = "/")
    public void addUser(@RequestBody User user) {
        userService.saveUser(user);
    }



}
