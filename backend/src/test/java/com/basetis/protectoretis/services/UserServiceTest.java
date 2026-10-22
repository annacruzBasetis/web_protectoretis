package com.basetis.protectoretis.services;

import com.basetis.protectoretis.services.model.*;
import com.basetis.protectoretis.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;


@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    @Test
    void ShouldCreateValidUser() {
        //Arrange
        UserName name = new UserName("Jane Doe");
        UserEmail email = new UserEmail("JD@gmail.com");
        UserPassword password = new UserPassword("1234");

        User user = new User(name, email, password);

        //Act
        userService.createUser(user);

        //Assert
        verify(userRepository).createUser(user);
    }
}
