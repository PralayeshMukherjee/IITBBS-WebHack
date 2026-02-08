package com.example.space.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="User")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    @Id
    private String email;
    private String password;
    @OneToMany(mappedBy = "user")
    private List<UserObjectHistory> searchHistory = new ArrayList<>();
}
