package ru.upt.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Partition {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "constructionObjectId", referencedColumnName = "id")
    private ConstructionObject constructionObject;

}
