package ru.upt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Информация о человеке
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicPersonDto {
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

    public String getFio() {
        return String.format("%s %s %s", getSurname(), getName(), getMiddleName());
    }
}
