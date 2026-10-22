package com.basetis.protectoretis.services;

import com.basetis.protectoretis.repositories.UserRepository;
import com.basetis.protectoretis.services.model.User;


public class UserService {

private final UserRepository userRepository;

 public UserService(UserRepository userRepository){
        this.userRepository = userRepository;

    }

 public void createUser(User user){
    userRepository.createUser(user);

    
 }


  
}