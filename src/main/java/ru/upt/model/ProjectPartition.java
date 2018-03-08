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
@ToString(exclude="constructionObject")
@EqualsAndHashCode(of={"id"})
public class ProjectPartition {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Наименование раздела проектной документации
     */
    private String name;

    /**
     * Шифр раздела проектной документации
     */
    private String code;

    @ManyToOne
    @JoinColumn(name="constructionObjectId", referencedColumnName = "id")
    private ConstructionObject constructionObject;
    /**
     * Проектная документация, входящая в  раздел
     */
    @OneToMany(targetEntity=ProjectDocument.class, mappedBy="projectPartition", fetch= FetchType.EAGER)
    private Set<ProjectDocument> projectDocuments = new LinkedHashSet<>();

    public ProjectPartition(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public ProjectPartition(String name, String code, ConstructionObject constructionObject) {
        this.name = name;
        this.code = code;
        this.constructionObject = constructionObject;
    }
}
