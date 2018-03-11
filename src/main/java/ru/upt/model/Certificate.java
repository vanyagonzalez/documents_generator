package ru.upt.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Сертификат -- Документ, подтверждающий качество применяемых материалов
 */
@Data
@Entity
@EqualsAndHashCode(of={"id"})
@NoArgsConstructor
@AllArgsConstructor
public class Certificate {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Материал -- Наименование сертифицируемого материала
     */
    private String material;
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
     * единица измерения объема материала, "засертифицированного" данным документом
     */
    private String measureUnit;
    /**
     * скан-копия документа
     */
    private String documentCopy;

    public Certificate(Long id, String material) {
        this.id = id;
        this.material = material;
    }

    public Certificate(String material,
                       String standardDocument,
                       String documentKind,
                       String documentNumber,
                       Date documentDate,
                       Date documentEndDate,
                       Double materialVolume,
                       String measureUnit,
                       String documentCopy) {
        this.material = material;
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
