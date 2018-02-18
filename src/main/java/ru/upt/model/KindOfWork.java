package ru.upt.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Вид работы -- вид работы, необходимый к выполению и дальнейшему освидетельствованию
 */
@Data
@Entity
public class KindOfWork {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Наименование работы
     */
    private String name;
    /**
     * Объем выполненной работы
     */
    private String amountOfWork;
    /**
     * единица измерения выполненного объема
     */
    private String measureUnit;
    /**
     * Организация - фактически выполнившая работу
     */
    @ManyToOne
    @JoinColumn(name="executorId", referencedColumnName = "id")
    private Organization executor;
    /**
     * Представитель исполнителя работы -- Ответственный представитель организации, физически выполневшией работу
     */
    @ManyToOne
    @JoinColumn(name="executorRepresentativeId", referencedColumnName = "id")
    private Employee executorRepresentative;
    /**
     * Представители иных лиц, участвующих в освидетельствовании
     */
    //private List<Employee> otherRepresentators;
    /**
     * Дополнительные нормативные документы согласно которых выполнены работы
     */
    private String additionalReason;
    /**
     * Дата начала производства работ
     */
    private Date beginDate;
    /**
     * Дата окончания производства работ
     */
    private Date endDate;
    /**
     * Дата проведения комиссии по приемке работ
     */
    private Date presentationDate;
    /**
     * К какому листу относится данный вид работы
     */
    @ManyToOne
    @JoinColumn(name="documentationSheetId", referencedColumnName = "id")
    private DocumentationSheet documentationSheet;

}
