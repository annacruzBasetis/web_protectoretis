
import com.basetis.protectoretis.service.UserService;
import com.basetis.protectoretis.entity.User;
import com.basetis.protectoretis.repository.UserRepository;
import com.basetis.protectoretis.dto.UserCreateDto;
import com.basetis.protectoretis.mapper.UserMapper;


import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    UserService userservice;

    @Mock
    UserRepository repository;

    @Mock
    UserMapper userMapper;

    @Test
    void ShouldCreateValidUser() {
        //ARRANGE
        UserCreateDto createDto = new UserCreateDto(
            "Cleo", 
            "cleo@cleo.com"//, 
            //"Hola1@345"
        );

        User user = new User();

        when(userMapper.toEntity(createDto)).thenReturn(user);
        when(repository.save(user)).thenReturn(user);

        //ACT
        userservice.createUser(createDto);

        //ASSERT
        verify(repository).save(user);
    }
}