package ru.upt.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Полная информация о человеке
 */
@Data
@NoArgsConstructor
public class PersonDto extends BasicPersonDto {
    /**
     * Список должностей
     */
    private List<BasicEmployeeDto> employees;

    public PersonDto(Long id, String surname, String name, String middleName, List<BasicEmployeeDto> employees) {
        super(id, surname, name, middleName);
        this.employees = employees;
    }
}
