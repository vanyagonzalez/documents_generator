package ru.upt.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
@EqualsAndHashCode(of={"id"})
public class Confirmation {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Наименование документа
     */
    private String name;
    /**
     * номер документа
     */
    private String number;
    /**
     * Дата выдачи документа
     */
    private Date issueDate;
    /**
     * скан-копия документа
     */
    private String copy;
}
