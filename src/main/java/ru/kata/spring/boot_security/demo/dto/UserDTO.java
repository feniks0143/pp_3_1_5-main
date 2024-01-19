package ru.kata.spring.boot_security.demo.dto;


import ru.kata.spring.boot_security.demo.model.Role;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Set;
import java.util.TreeSet;

public class UserDTO {
    private Long id;

    @NotEmpty(message = "*имя не должно быть пустым")
    private String username;
    @NotEmpty(message = "*фамилия не должна быть пустой")
    private String lastName;
    @Min(value = 0, message = "*некорректный возраст")
    private int age;
    @Email(message = "*введите корректный email")
    private String email;
    @Column(name = "password")

    @Size(min = 3, message = "пароль должен быть не менее 4 символов")
    private String password;
    private Set<Role> roles = new TreeSet();


    public UserDTO() {
    }

    public UserDTO(String username, String lastName, int age, String email) {
        this.username = username;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
    }

    public UserDTO(String username, String lastName, int age, String email, String password, Set roles) {
        this.username = username;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set getRoles() {
        return roles;
    }

    public void setRoles(Set roles) {
        this.roles = roles;
    }
}
