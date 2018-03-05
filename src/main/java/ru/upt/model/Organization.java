package ru.upt.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * описание организаций, имеющих отношение к строительству
 */
@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(of={"id"})
public class Organization {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Название организации, включая ОПР
     */
    private String name;
    /**
     * ОГРН -- Целое число, строго 13 символов
     */
    private String ogrn;
    /**
     * ИНН -- Целое число, строго 10 символов
     */
    private String inn;
    /**
     * Номер СРО -- Саморегулируемая организация
     */
    private String sroNumber;
    /**
     * СР выдавшая СРО -- Саморегулируемая организация, выдавшая СРО
     */
    private String organizationIssuingSro;
    /**
     * Дата выдачи СРО
     */
    private Date sroIssuedDate;
    /**
     * Юридический адрес организации
     */
    private String address;
    /**
     * Номер телефона организации -- Целое число, не больше 11 символов
     */
    private String phoneNumber;
    /**
     * Номер факса организации
     */
    private String faxNumber;

    /**
     * Список сотрудников, задействованых на объекте
     */
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "organization_employee",
            joinColumns = @JoinColumn(name = "employeeId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "organizationId", referencedColumnName = "id")
    )
    private Set<Employee> employees;

    public Organization(String name, String ogrn, String inn) {
        this.name = name;
        this.ogrn = ogrn;
        this.inn = inn;
    }
}
