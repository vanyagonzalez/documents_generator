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
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "work_employee",
            joinColumns = @JoinColumn(name = "employeeId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "workId", referencedColumnName = "id")
    )
    private Set<Employee> otherRepresentatives = new LinkedHashSet<>();

    /**
     * Материалы, примененные для выполнения данных работ
     */
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "work_certificate",
            joinColumns = @JoinColumn(name = "certificateId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "workId", referencedColumnName = "id")
    )
    private Set<Certificate> certificates = new LinkedHashSet<>();

    /**
     * Документы, подтверждающие качество выполенных работ
     */
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "work_confirmation",
            joinColumns = @JoinColumn(name = "confirmationId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "workId", referencedColumnName = "id")
    )
    private Set<Confirmation> confirmations = new LinkedHashSet<>();

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
    @NonNull
    @ManyToOne
    @JoinColumn(name="documentationSheetId", referencedColumnName = "id")
    private DocumentationSheet documentationSheet;

}
