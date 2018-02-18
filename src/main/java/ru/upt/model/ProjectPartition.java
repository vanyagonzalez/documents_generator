package ru.upt.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * Раздел проекта -- разделы проектной документации, входящих в стотав объекта
 */
@Data
@Entity
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
    private List<ProjectDocument> projectDocuments;

}
