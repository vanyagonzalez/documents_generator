package ru.upt.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * Вид работы -- вид работы, необходимый к выполению и дальнейшему освидетельствованию
 */
@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(of={"id"})
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
     * Организация фактически выполнившая работу
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
    @ManyToMany(cascade = {CascadeType.MERGE,CascadeType.REFRESH})
    @JoinTable(name = "work_employee",
            joinColumns = @JoinColumn(name = "workId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "employeeId", referencedColumnName = "id")
    )
    private Set<Employee> otherRepresentatives;

    /**
     * Материалы, примененные для выполнения данных работ
     */
    @ManyToMany(cascade = {CascadeType.MERGE,CascadeType.REFRESH})
    @JoinTable(name = "work_certificate",
            joinColumns = @JoinColumn(name = "workId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "certificateId", referencedColumnName = "id")
    )
    private Set<Certificate> certificates;

    /**
     * Документы, подтверждающие качество выполенных работ
     */
    @ManyToMany(cascade = {CascadeType.MERGE,CascadeType.REFRESH})
    @JoinTable(name = "work_confirmation",
            joinColumns = @JoinColumn(name = "workId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "confirmationId", referencedColumnName = "id")
    )
    private Set<Confirmation> confirmations;

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

    public KindOfWork(String name,
                      String amountOfWork,
                      String measureUnit,
                      Organization executor,
                      Employee executorRepresentative,
                      Set<Employee> otherRepresentatives,
                      Set<Certificate> certificates,
                      Set<Confirmation> confirmations,
                      String additionalReason,
                      Date beginDate,
                      Date endDate,
                      Date presentationDate,
                      DocumentationSheet documentationSheet) {
        this.name = name;
        this.amountOfWork = amountOfWork;
        this.measureUnit = measureUnit;
        this.executor = executor;
        this.executorRepresentative = executorRepresentative;
        this.otherRepresentatives = otherRepresentatives;
        this.certificates = certificates;
        this.confirmations = confirmations;
        this.additionalReason = additionalReason;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.presentationDate = presentationDate;
        this.documentationSheet = documentationSheet;
    }

    public KindOfWork(Long id,
                      String name,
                      String amountOfWork,
                      String measureUnit,
                      Organization executor,
                      Employee executorRepresentative,
                      Set<Employee> otherRepresentatives,
                      Set<Certificate> certificates,
                      Set<Confirmation> confirmations,
                      String additionalReason,
                      Date beginDate,
                      Date endDate,
                      Date presentationDate,
                      DocumentationSheet documentationSheet) {
        this.id = id;
        this.name = name;
        this.amountOfWork = amountOfWork;
        this.measureUnit = measureUnit;
        this.executor = executor;
        this.executorRepresentative = executorRepresentative;
        this.otherRepresentatives = otherRepresentatives;
        this.certificates = certificates;
        this.confirmations = confirmations;
        this.additionalReason = additionalReason;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.presentationDate = presentationDate;
        this.documentationSheet = documentationSheet;
    }
}
