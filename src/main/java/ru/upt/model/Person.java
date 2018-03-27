package ru.upt.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Информация о человеке
 */
@Data
@Entity
@EqualsAndHashCode(of = {"id"})
@NoArgsConstructor
@AllArgsConstructor
public class Person {
    @Id
    @GeneratedValue
    private Long id;

    /**
     * Фамилия
     */
    private String surname;
    /**
     * Имя
     */
    private String name;
    /**
     * Отчество
     */
    private String middleName;

    /**
     * Привязка к рабочим местам
     */
    @OneToMany(targetEntity=Employee.class, mappedBy="person", fetch= FetchType.EAGER)
    private Set<Employee> employees = new LinkedHashSet<>();

    public Person(String surname, String name, String middleName) {
        this.surname = surname;
        this.name = name;
        this.middleName = middleName;
    }

    public Person(Long id, String surname, String name, String middleName) {
        this(surname, name, middleName);
        this.id = id;
    }


}
