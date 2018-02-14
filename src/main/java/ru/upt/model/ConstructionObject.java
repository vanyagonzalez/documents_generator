package ru.upt.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
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
    @OneToMany(targetEntity=Partition.class, mappedBy="constructionObject", fetch= FetchType.EAGER)
    private List<Partition> partitions;
    /**
     * Количество экземпляров приемо-сдаточной документации, необходимой к оформлению
     */
    private Long copies;

}
