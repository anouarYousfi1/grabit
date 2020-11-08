package com.anouar.grabit.service;

import com.anouar.grabit.model.User;
import com.anouar.grabit.repository.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestInstance(value = TestInstance.Lifecycle.PER_CLASS)
public class UserServiceTest {

    @InjectMocks
    UserService userService = new UserServiceImpl();

    @Mock
    UserRepository userRepository;


    @BeforeAll
    public void init(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void shouldFindUserByEmail() {
        when(userRepository.findByEmail("test")).thenReturn(new User());
        User user = userService.findUser("test");

        assertNotEquals(null, user);
    }



}
