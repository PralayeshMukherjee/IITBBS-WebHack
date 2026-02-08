package com.example.space.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name="User_Object_History")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserObjectHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_email")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "object_id")
    private ObjectEntity object;

    private Date searchDate;
}
