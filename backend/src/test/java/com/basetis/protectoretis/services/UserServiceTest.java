import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    UserService userservice;

    @Mock
    UserRepository repository;

    @Test
    void ShouldCreateValidUser() {
        //ARRANGE
        Username username = new Username("Cleo");
        Email email = new Email("cleo.letron@basetis.com");
        Password password = new Password("Hola1@345");

        User user = new User(username, email, password); 

        //ACT
       
        userservice.createUser(user);

        //ASSERT
        verify(repository).create(user);
    }
}