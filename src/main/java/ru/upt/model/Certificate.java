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
@RequiredArgsConstructor
public class Certificate {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Материал -- Наименование сертифицируемого материала
     */
    @NonNull
    private String material;
    /**
     * Нормативный документ, согласно которого изготовлен материал
     */
    @NonNull
    private String standardDocument;
    /**
     * Вид документа
     */
    @NonNull
    private String documentKind;
    /**
     * Нормер документа, подтверждающего качество материала
     */
    @NonNull
    private String documentNumber;
    /**
     * Дата выдачи документа, подтверждающего качество материала
     */
    @NonNull
    private Date documentDate;
    /**
     * Дата окончания срока действия документа
     */
    @NonNull
    private Date documentEndDate;
    /**
     *  Объем материала, "засертифицированного" данным документом
     */
    @NonNull
    private Double materialVolume;
    /**
     * единица измерения объема материала, "засертифицированного" данным документом
     */
    @NonNull
    private String measureUnit;
    /**
     * скан-копия документа
     */
    @NonNull
    private String documentCopy;

}
