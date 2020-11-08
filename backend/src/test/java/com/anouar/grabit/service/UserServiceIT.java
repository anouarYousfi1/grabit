package com.anouar.grabit.service;

import com.anouar.grabit.model.User;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserServiceIT {


    @Autowired
    UserService userService;

        
    @Test
    public void shouldFindUserByEmail(){

        User user = userService.findUser("yassineyousfi.contact@gmail.com");

        assertNotEquals(null, user);
    }


}
