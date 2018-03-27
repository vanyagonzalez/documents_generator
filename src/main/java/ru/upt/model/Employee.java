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
     * Информация о сотруднике
     */
    @ManyToOne
    @JoinColumn(name="personId", referencedColumnName = "id")
    private Person person;

    /**
     * Информация об организации
     */
    @ManyToOne
    @JoinColumn(name="organizationId", referencedColumnName = "id")
    private Organization organization;

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

    public Employee(Long id, Person person, Organization organization, String position) {
        this.id = id;
        this.person = person;
        this.organization = organization;
        this.position = position;
    }

    public Employee(Person person, Organization organization, String position, String orderNumber, Date orderDate) {
        this.person = person;
        this.organization = organization;
        this.position = position;
        this.orderNumber = orderNumber;
        this.orderDate = orderDate;
    }

    public Employee(Long id, Person person, Organization organization, String position, String orderNumber, Date orderDate) {
        this(person, organization, position, orderNumber, orderDate);
        this.id = id;
    }
}
