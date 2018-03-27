package ru.upt.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Полная информация о человеке
 */
@Data
@NoArgsConstructor
public class PersonDto extends BasicPersonDto {
    public PersonDto(Long id, String surname, String name, String middleName) {
        super(id, surname, name, middleName);
    }
}
