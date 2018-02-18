package ru.upt.model;

import lombok.*;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Раздел проекта -- разделы проектной документации, входящих в стотав объекта
 */
@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@ToString(exclude="constructionObject")
@EqualsAndHashCode(of={"id"})
public class ProjectPartition {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Наименование раздела проектной документации
     */
    @NonNull
    private String name;

    /**
     * Шифр раздела проектной документации
     */
    @NonNull
    private String code;

    @NonNull
    @ManyToOne
    @JoinColumn(name="constructionObjectId", referencedColumnName = "id")
    private ConstructionObject constructionObject;
    /**
     * Проектная документация, входящая в  раздел
     */
    @OneToMany(targetEntity=ProjectDocument.class, mappedBy="projectPartition", fetch= FetchType.EAGER)
    private Set<ProjectDocument> projectDocuments = new LinkedHashSet<>();

}
