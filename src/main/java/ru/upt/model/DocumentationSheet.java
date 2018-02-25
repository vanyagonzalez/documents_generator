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
@RequiredArgsConstructor
@EqualsAndHashCode(of={"id"})
public class DocumentationSheet {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Наименование листа проектной документации
     */
    @NonNull
    private String name;
    /**
     * Номер листа проектной документации
     */
    @NonNull
    private Long number;
    /**
     * Номер изменения листа проектной документации
     */
    @NonNull
    private Long change;

    @OneToMany(targetEntity=KindOfWork.class, mappedBy="documentationSheet", fetch= FetchType.EAGER)
    private Set<KindOfWork> kindOfWorks = new LinkedHashSet<>();

    /**
     * К какой проектной документации относится данный лист
     */
    @NonNull
    @ManyToOne
    @JoinColumn(name="projectDocumentId", referencedColumnName = "id")
    private ProjectDocument projectDocument;
}
