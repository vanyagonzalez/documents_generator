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
@RequiredArgsConstructor
public class Confirmation {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Наименование документа
     */
    @NonNull
    private String name;
    /**
     * номер документа
     */
    @NonNull
    private String number;
    /**
     * Дата выдачи документа
     */
    @NonNull
    private Date issueDate;
    /**
     * скан-копия документа
     */
    @NonNull
    private String copy;
}
