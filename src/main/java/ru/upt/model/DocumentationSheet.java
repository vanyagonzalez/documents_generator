package ru.upt.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * лист, входящий в состав проектной документации
 */
@Data
@Entity
public class DocumentationSheet {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Наименование листа проектной документации
     */
    private String name;
    /**
     * Номер листа проектной документации
     */
    private Long number;
    /**
     * Номер изменения листа проектной документации
     */
    private Long change;
    /**
     * К какой проектной документации относится данный лист
     */
    @ManyToOne
    @JoinColumn(name="projectDocumentId", referencedColumnName = "id")
    private ProjectDocument projectDocument;

    @OneToMany(targetEntity=KindOfWork.class, mappedBy="documentationSheet", fetch= FetchType.EAGER)
    private List<KindOfWork> kindOfWorks;
}
