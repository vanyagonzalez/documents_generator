package ru.upt.model;

import lombok.*;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Проектная документация -- проектная документация, входящая в состав раздела
 */
@Data
@Entity
@NoArgsConstructor
@ToString(exclude="projectPartition")
@EqualsAndHashCode(of={"id"})
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
    private Set<DocumentationSheet> documentationSheets = new LinkedHashSet<>();

    /**
     * К какому разделу относится данная проектная документация
     */
    @ManyToOne
    @JoinColumn(name="projectPartitionId", referencedColumnName = "id")
    private ProjectPartition projectPartition;

    public ProjectDocument(String name, String code, String phase, Employee author, Employee customerRepresentative, Employee developerRepresentative, ProjectPartition projectPartition) {
        this.name = name;
        this.code = code;
        this.phase = phase;
        this.author = author;
        this.customerRepresentative = customerRepresentative;
        this.developerRepresentative = developerRepresentative;
        this.projectPartition = projectPartition;
    }
}
