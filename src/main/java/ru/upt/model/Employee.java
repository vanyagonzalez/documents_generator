package ru.upt.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Сотрудник -- сотруднк, участвующих в строительстве
 */
@Data
@Entity
@EqualsAndHashCode(of={"id"})
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
    private List<Organization> organizations;

}
