package ru.upt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicEmployeeDto {
    /**
     * идентификатор
     */
    private Long id;
    /**
     * Человек
     */
    private BasicPersonDto person;
    /**
     * Организация
     */
    private BasicOrganizationDto organization;
    /**
     * Должность
     */
    private String position;
}
