package ru.upt.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * Сотрудник -- сотруднк, участвующих в строительстве
 */
@Data
@Entity
@EqualsAndHashCode(of={"id"})
@NoArgsConstructor
public class Employee {
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
     * Должность
     */
    private String position;
    /**
     * Номер приказа о назначении на должность
     */
    private String orderNumber;
    /**
     * Дата приказа о назначении на должность
     */
    private Date orderDate;

    @ManyToMany(mappedBy = "employees")
    private Set<Organization> organizations;

    public Employee(Long id, String surname, String name, String middleName) {
        this.id = id;
        this.surname = surname;
        this.name = name;
        this.middleName = middleName;
    }

    public Employee(String surname, String name, String middleName, String position) {
        this.surname = surname;
        this.name = name;
        this.middleName = middleName;
        this.position = position;
    }

    public Employee(String surname, String name, String middleName, String position, String orderNumber, Date orderDate, Set<Organization> organizations) {
        this.surname = surname;
        this.name = name;
        this.middleName = middleName;
        this.position = position;
        this.orderNumber = orderNumber;
        this.orderDate = orderDate;
        this.organizations = organizations;
    }
}
