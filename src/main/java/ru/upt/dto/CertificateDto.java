package ru.upt.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CertificateDto extends BasicCertificateDto {
    /**
     * Нормативный документ, согласно которого изготовлен материал
     */
    private String standardDocument;
    /**
     * Вид документа
     */
    private String documentKind;
    /**
     * Нормер документа, подтверждающего качество материала
     */
    private String documentNumber;
    /**
     * Дата выдачи документа, подтверждающего качество материала
     */
    private Date documentDate;
    /**
     * Дата окончания срока действия документа
     */
    private Date documentEndDate;
    /**
     *  Объем материала, "засертифицированного" данным документом
     */
    private Double materialVolume;
    /**
     * Единица измерения объема материала, "засертифицированного" данным документом
     */
    private String measureUnit;
    /**
     * Скан-копия документа
     */
    private String documentCopy;

    public CertificateDto(Long id, String material, String standardDocument, String documentKind, String documentNumber, Date documentDate, Date documentEndDate, Double materialVolume, String measureUnit, String documentCopy) {
        super(id, material);
        this.standardDocument = standardDocument;
        this.documentKind = documentKind;
        this.documentNumber = documentNumber;
        this.documentDate = documentDate;
        this.documentEndDate = documentEndDate;
        this.materialVolume = materialVolume;
        this.measureUnit = measureUnit;
        this.documentCopy = documentCopy;
    }
}
