package ru.upt.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ConfirmationDto extends BasicConfirmationDto {
    /**
     * Номер документа
     */
    private String number;
    /**
     * Дата выдачи документа
     */
    private Date issueDate;
    /**
     * Скан-копия документа
     */
    private String copy;

    public ConfirmationDto(Long id, String name, String number, Date issueDate, String copy) {
        super(id, name);
        this.number = number;
        this.issueDate = issueDate;
        this.copy = copy;
    }
}
