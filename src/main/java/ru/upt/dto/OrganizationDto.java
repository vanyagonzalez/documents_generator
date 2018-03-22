package ru.upt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class OrganizationDto extends BasicOrganizationDto{
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
    private List<BasicEmployeeDto> employees;

    public OrganizationDto(Long id,
                           String name,
                           String ogrn,
                           String inn,
                           String sroNumber,
                           String organizationIssuingSro,
                           Date sroIssuedDate,
                           String address,
                           String phoneNumber,
                           String faxNumber,
                           List<BasicEmployeeDto> employees) {
        super(id, name);
        this.ogrn = ogrn;
        this.inn = inn;
        this.sroNumber = sroNumber;
        this.organizationIssuingSro = organizationIssuingSro;
        this.sroIssuedDate = sroIssuedDate;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.faxNumber = faxNumber;
        this.employees = employees;
    }
}
