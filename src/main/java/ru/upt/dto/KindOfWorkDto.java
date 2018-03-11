package ru.upt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class KindOfWorkDto extends BasicKindOfWorkDto {
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
    private BasicOrganizationDto executor;
    /**
     * Представитель исполнителя работы -- Ответственный представитель организации, физически выполневшией работу
     */
    private BasicEmployeeDto executorRepresentative;
    /**
     * Представители иных лиц, участвующих в освидетельствовании
     */
    private List<BasicEmployeeDto> otherRepresentatives;
    /**
     * Материалы, примененные для выполнения данных работ
     */
    private List<BasicCertificateDto> certificates;
    /**
     * Документы, подтверждающие качество выполенных работ
     */
    private List<BasicConfirmationDto> confirmations;
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

    private BasicDocumentationSheetDto documentationSheet;

    public KindOfWorkDto(Long id,
                         String name,
                         String amountOfWork,
                         String measureUnit,
                         BasicOrganizationDto executor,
                         BasicEmployeeDto executorRepresentative,
                         List<BasicEmployeeDto> otherRepresentatives,
                         List<BasicCertificateDto> certificates,
                         List<BasicConfirmationDto> confirmations,
                         String additionalReason,
                         Date beginDate,
                         Date endDate,
                         Date presentationDate) {
        super(id, name);
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
    }
}
