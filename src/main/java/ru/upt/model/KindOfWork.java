package ru.upt.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Вид работы -- вид работы, необходимый к выполению и дальнейшему освидетельствованию
 */
@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of={"id"})
public class KindOfWork {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Наименование работы
     */
    @NonNull
    private String name;
    /**
     * Объем выполненной работы
     */
    @NonNull
    private String amountOfWork;
    /**
     * единица измерения выполненного объема
     */
    @NonNull
    private String measureUnit;
    /**
     * Организация - фактически выполнившая работу
     */
    @NonNull
    @ManyToOne
    @JoinColumn(name="executorId", referencedColumnName = "id")
    private Organization executor;
    /**
     * Представитель исполнителя работы -- Ответственный представитель организации, физически выполневшией работу
     */
    @NonNull
    @ManyToOne
    @JoinColumn(name="executorRepresentativeId", referencedColumnName = "id")
    private Employee executorRepresentative;
    /**
     * Представители иных лиц, участвующих в освидетельствовании
     */
    @NonNull
    @ManyToMany(cascade = {CascadeType.MERGE,CascadeType.REFRESH})
    @JoinTable(name = "work_employee",
            joinColumns = @JoinColumn(name = "workId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "employeeId", referencedColumnName = "id")
    )
    private Set<Employee> otherRepresentatives;

    /**
     * Материалы, примененные для выполнения данных работ
     */
    @NonNull
    @ManyToMany(cascade = {CascadeType.MERGE,CascadeType.REFRESH})
    @JoinTable(name = "work_certificate",
            joinColumns = @JoinColumn(name = "workId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "certificateId", referencedColumnName = "id")
    )
    private Set<Certificate> certificates;

    /**
     * Документы, подтверждающие качество выполенных работ
     */
    @NonNull
    @ManyToMany(cascade = {CascadeType.MERGE,CascadeType.REFRESH})
    @JoinTable(name = "work_confirmation",
            joinColumns = @JoinColumn(name = "workId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "confirmationId", referencedColumnName = "id")
    )
    private Set<Confirmation> confirmations;

    /**
     * Дополнительные нормативные документы согласно которых выполнены работы
     */
    @NonNull
    private String additionalReason;
    /**
     * Дата начала производства работ
     */
    @NonNull
    private Date beginDate;
    /**
     * Дата окончания производства работ
     */
    @NonNull
    private Date endDate;
    /**
     * Дата проведения комиссии по приемке работ
     */
    @NonNull
    private Date presentationDate;
    /**
     * К какому листу относится данный вид работы
     */
    @NonNull
    @ManyToOne
    @JoinColumn(name="documentationSheetId", referencedColumnName = "id")
    private DocumentationSheet documentationSheet;

}
