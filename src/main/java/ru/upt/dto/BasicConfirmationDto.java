package ru.upt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicConfirmationDto {
    /**
     * идентификатор
     */
    private Long id;
    /**
     * Наименование документа
     */
    private String name;
}
