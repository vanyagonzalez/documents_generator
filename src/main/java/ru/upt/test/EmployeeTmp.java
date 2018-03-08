package ru.upt.test;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class EmployeeTmp {

    private @Id @GeneratedValue Long id;
    private String firstName;
    private String lastName;
    private String description;

    private @Version @JsonIgnore Long version;

    private @ManyToOne Manager manager;

    private EmployeeTmp() {}

    public EmployeeTmp(String firstName, String lastName, String description, Manager manager) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = description;
        this.manager = manager;
    }
}
