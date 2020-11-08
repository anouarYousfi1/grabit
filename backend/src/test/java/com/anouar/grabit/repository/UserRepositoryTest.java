package com.anouar.grabit.repository;

import com.anouar.grabit.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import sun.security.util.Length;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;


@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    public void shouldReturnTwoUsers(){
        List<User> users = userRepository.findAll();
        assertEquals(2, users.size());
    }

    @Test
    public void shoudlFindUserByEmail(){

        String existingEmail = "yassineyousfi.contact@gmail.com";
        User existingUser = userRepository.findByEmail(existingEmail);
        assertNotEquals(null, existingUser);

        String noneExistingEmail = "nothing";
        User noneExistingUser = userRepository.findByEmail(noneExistingEmail);

        assertEquals(null, noneExistingUser);


    }




}
