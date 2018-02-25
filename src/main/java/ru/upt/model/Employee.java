package ru.upt.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Сотрудник -- сотруднк, участвующих в строительстве
 */
@Data
@Entity
@EqualsAndHashCode(of={"id"})
@NoArgsConstructor
@RequiredArgsConstructor
public class Employee {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Фамилия
     */
    @NonNull
    private String surname;
    /**
     * Имя
     */
    @NonNull
    private String name;
    /**
     * Отчество
     */
    @NonNull
    private String middleName;
    /**
     * Должность
     */
    @NonNull
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
