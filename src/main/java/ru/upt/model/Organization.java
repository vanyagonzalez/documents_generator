package ru.upt.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.LinkedHashSet;
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
     * Список сотрудников
     */
    @OneToMany(targetEntity=Employee.class, mappedBy="organization", fetch= FetchType.EAGER)
    private Set<Employee> employees = new LinkedHashSet<>();

    public Organization(String name, String ogrn, String inn) {
        this.name = name;
        this.ogrn = ogrn;
        this.inn = inn;
    }

    public Organization(String name,
                        String ogrn,
                        String inn,
                        String sroNumber,
                        String organizationIssuingSro,
                        Date sroIssuedDate,
                        String address,
                        String phoneNumber,
                        String faxNumber) {
        this.name = name;
        this.ogrn = ogrn;
        this.inn = inn;
        this.sroNumber = sroNumber;
        this.organizationIssuingSro = organizationIssuingSro;
        this.sroIssuedDate = sroIssuedDate;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.faxNumber = faxNumber;
    }

    public Organization(Long id,
                        String name,
                        String ogrn,
                        String inn,
                        String sroNumber,
                        String organizationIssuingSro,
                        Date sroIssuedDate,
                        String address,
                        String phoneNumber,
                        String faxNumber) {
        this(name, ogrn, inn, sroNumber, organizationIssuingSro, sroIssuedDate, address, phoneNumber, faxNumber);
        this.id = id;
    }
}
