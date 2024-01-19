package ru.kata.spring.boot_security.demo.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByUsernameContainsIgnoreCase(String name);


    @Query("SELECT u from User u left join fetch u.roles where u.username=:username")
    Optional<User> findByUsername(@Param("username") String username);

    @Query("SELECT u from User u left join fetch u.roles where u.email=:email")
    Optional<User> findByEmailEqualsIgnoreCase(@Param("email") String email);
}
