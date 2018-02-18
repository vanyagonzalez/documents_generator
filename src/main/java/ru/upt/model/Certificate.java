package ru.upt.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

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
     * нормер документа, подтверждающего качество материала
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

}
