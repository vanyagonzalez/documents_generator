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
@RequiredArgsConstructor
@ToString(exclude="projectPartition")
@EqualsAndHashCode(of={"id"})
public class ProjectDocument {
    @Id
    @GeneratedValue
    private Long id;

    /**
     * Наименование проектной документации
     */
    @NonNull
    private String name;

    /**
     * Шифр проектной документации
     */
    @NonNull
    private String code;
    /**
     * Стадия проектирования
     */
    private String phase;

    /**
     * К какому разделу относится данная проектная документация
     */
    @NonNull
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
    private Set<DocumentationSheet> documentationSheets = new LinkedHashSet<>();

}
