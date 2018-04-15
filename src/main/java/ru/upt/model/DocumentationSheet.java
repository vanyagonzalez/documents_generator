package ru.upt.model;

import lombok.*;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * лист, входящий в состав проектной документации
 */
@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(of={"id"})
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

    @OneToMany(targetEntity=KindOfWork.class, mappedBy="documentationSheet", fetch= FetchType.EAGER)
    private Set<KindOfWork> kindOfWorks = new LinkedHashSet<>();

    /**
     * К какой проектной документации относится данный лист
     */
    @ManyToOne
    @JoinColumn(name="projectDocumentId", referencedColumnName = "id")
    private ProjectDocument projectDocument;

    public DocumentationSheet(String name, Long number, Long change, ProjectDocument projectDocument) {
        this.name = name;
        this.number = number;
        this.change = change;
        this.projectDocument = projectDocument;
    }

    public DocumentationSheet(Long id, String name, Long number, Long change, ProjectDocument projectDocument) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.change = change;
        this.projectDocument = projectDocument;
    }

    public DocumentationSheet(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
