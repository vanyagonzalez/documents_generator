package ru.upt.model;

import lombok.*;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of={"id"})
public class ConstructionObject {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Наименование объекта
     */
    @NonNull
    private String name;
    /**
     * Шифр объекта
     */
    @NonNull
    private String code;
    /**
     * Организация - заказчик
     */
    @NonNull
    @ManyToOne
    @JoinColumn(name="customerId", referencedColumnName = "id")
    private Organization customer;
    /**
     * Организация - застройщик
     */
    @NonNull
    @ManyToOne
    @JoinColumn(name="developerId", referencedColumnName = "id")
    private Organization developer;
    /**
     * Разделы проектной документации, входящие в состав объекта
     */
    @OneToMany(targetEntity=ProjectPartition.class, mappedBy="constructionObject", fetch= FetchType.EAGER)
    private Set<ProjectPartition> projectPartitions = new LinkedHashSet<>();
    /**
     * Количество экземпляров приемо-сдаточной документации, необходимой к оформлению
     */
    private Long copies;

}
