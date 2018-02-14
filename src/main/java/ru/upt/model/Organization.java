package ru.upt.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * описание организаций, имеющих отношение к строительству
 */
@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class Organization {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Название организации, включая ОПР
     */
    @NonNull
    private String name;
    /**
     * ОГРН -- Целое число, строго 13 символов
     */
    @NonNull
    private String ogrn;
    /**
     * ИНН -- Целое число, строго 10 символов
     */
    @NonNull
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

}
