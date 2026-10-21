package com.example.protectoretis;

import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class DummyTest {

    @Test
    void sanityCheck() {
        // Verifica que el runner de pruebas se ejecute correctamente
        assertTrue(true);
    }
}


class UserServiceTest {

	@Test
    void ShouldCreateValidUser() {
        //Arrange
        UserName name = new UserName();
        String email = new UserEmail();
        String password = new UserPassword();

        User user = new user(UserName, UserEmail, UserPassword);

        //Act

        //Assert
    }


}
