package com.basetis.protectoretis.service;

import com.basetis.protectoretis.entity.User;
import com.basetis.protectoretis.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends OidcUserService { 

    @Autowired
    private UserRepository userRepository;

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        // 1. Obtener datos desde Google (OIDC)
        OidcUser oidcUser = super.loadUser(userRequest);
        String email = oidcUser.getAttribute("email");
        String name = oidcUser.getAttribute("name");

        System.out.println("=== VERIFICANDO EMAIL EN BBDD: " + email + " ===");

        // 2. Buscar en PostgreSQL. Si NO existe, salta la excepción
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    System.out.println("❌ ACCESO DENEGADO: El email " + email + " NO está en la BBDD.");
                    return new OAuth2AuthenticationException(
                            new OAuth2Error("user_not_invited"),
                            "Accès denegat: el teu email (" + email + ") no està invitat."
                    );
                });

        System.out.println("✅ ACCESO PERMITIDO: El usuario existe en la BBDD.");

        // 3. Actualizamos el nombre si ha cambiado
        user.setName(name);
        userRepository.save(user);

        return oidcUser;
    }
}