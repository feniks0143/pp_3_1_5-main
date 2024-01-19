package ru.kata.spring.boot_security.demo.model;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Objects;
import java.util.Set;
import java.util.TreeSet;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true)
    @NotEmpty(message = "*имя не должно быть пустым")
    private String username;

    @Column(name = "last_name")
    @NotEmpty(message = "*фамилия не должна быть пустой")
    private String lastName;

    @Column(name = "age")
    @Min(value = 0, message = "*некорректный возраст")
    private int age;

    @Column(name = "email")
    @Email(message = "*введите корректный email")
    private String email;

    @Column(name = "password")
    @Size(min = 3, message = "пароль должен быть не менее 4 символов")
    private String password;

    @ManyToMany
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"), // Указывает на поле, связанное с пользователем
            inverseJoinColumns = @JoinColumn(name = "role_id")) // Указывает на поле, связанное с ролью
    private Set<Role> roles = new TreeSet<>();

    public User(String username, int age, String email, String password) {
        this.username = username;
        this.age = age;
        this.email = email;
        this.password = password;
    }

    public User(String username, String lastName, int age, String email, String password) {
        this.username = username;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
    }

    public User() {
    }

    public User(String username, int age, String email) {
        this.username = username;
        this.age = age;
        this.email = email;
    }

    public User(String username, String lastName, int age, String email, String password, Set<Role> roles) {
        this.username = username;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    public void setDefaultRole(Role role){
        this.roles.add(role);
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String name) {
        this.username = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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


    public Set<Role> getRoles() {
        return roles;
    }
    public String getStringOfRoles() {
        StringBuilder build = new StringBuilder();
        roles.stream().forEach(role -> build.append(role.toString()).append(" "));
        return build.toString();
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "========================\n" +
                "\t\tКлиент " +
                "#" + id +
                "\nИмя: " + username +
                ";\nВозраст: " + age +
                ";\nemail: '" + email + '\'' +
                "\n========================";
    }
}
