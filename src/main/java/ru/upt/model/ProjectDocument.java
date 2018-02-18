package ru.upt.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * Проектная документация -- проектная документация, входящая в состав раздела
 */
@Data
@Entity
public class ProjectDocument {
    @Id
    @GeneratedValue
    private Long id;

    /**
     * Наименование проектной документации
     */
    private String name;

    /**
     * Шифр проектной документации
     */
    private String code;
    /**
     * Стадия проектирования
     */
    private String phase;

    /**
     * К какому разделу относится данная проектная документация
     */
    @ManyToOne
    @JoinColumn(name="projectPartitionId", referencedColumnName = "id")
    private ProjectPartition projectPartition;
    /**
     * Автор проектной документации
     */
    @ManyToOne
    @JoinColumn(name="authorId", referencedColumnName = "id")
    private Employee author;
    /**
     * Ответственный представитель Заказчика
     */
    @ManyToOne
    @JoinColumn(name="customerRepresentativeId", referencedColumnName = "id")
    private Employee customerRepresentative;
    /**
     * Ответственный представитель Застройщика
     */
    @ManyToOne
    @JoinColumn(name="developerRepresentativeId", referencedColumnName = "id")
    private Employee developerRepresentative;

    /**
     * Листы проектной документации, входящие в состав проектной документации
     */
    @OneToMany(targetEntity=DocumentationSheet.class, mappedBy="projectDocument", fetch= FetchType.EAGER)
    private List<DocumentationSheet> documentationSheets;

}
