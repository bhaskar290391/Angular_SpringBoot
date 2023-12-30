package com.practise.ecommerce.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "country")
@Getter
@Setter
public class Country {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "code")
    private  String code ;

    @Column(name = "name")
    private String name ;

    @OneToMany(mappedBy = "country")
    private List<State> states;
}
