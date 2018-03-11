package ru.upt.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
@EqualsAndHashCode(of={"id"})
@NoArgsConstructor
@AllArgsConstructor
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

    public Confirmation(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Confirmation(String name, String number, Date issueDate, String copy) {
        this.name = name;
        this.number = number;
        this.issueDate = issueDate;
        this.copy = copy;
    }
}
