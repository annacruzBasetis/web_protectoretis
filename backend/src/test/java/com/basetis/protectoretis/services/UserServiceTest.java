import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;


class UserServiceTest {


    @Test
    void ShouldCreateValidUser() {
        //ARRANGE
        UsernameDto username;
        EmailDto email;
        PasswordDto password;

        User user = new User(username, email, password);



        //ACT
        
        //ASSERT
        assertTrue(true);
    }
}