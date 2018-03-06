package ru.upt.model;

import lombok.*;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(of={"id"})
public class ConstructionObject {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * Наименование объекта
     */
    private String name;
    /**
     * Шифр объекта
     */
    private String code;
    /**
     * Организация - заказчик
     */
    @ManyToOne
    @JoinColumn(name="customerId", referencedColumnName = "id")
    private Organization customer;
    /**
     * Организация - застройщик
     */
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

    public ConstructionObject(String name, String code, Organization customer, Organization developer) {
        this.name = name;
        this.code = code;
        this.customer = customer;
        this.developer = developer;
    }

    public ConstructionObject(Long id, String name, String code, Organization customer, Organization developer, Long copies) {
        this(name, code, customer, developer);
        this.id = id;
        this.copies = copies;
    }

    public ConstructionObject(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
