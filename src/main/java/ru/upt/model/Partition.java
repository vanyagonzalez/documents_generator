package ru.upt.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Partition {
    @Id
    @GeneratedValue
    private Long partitionId;
    private String name;
    @ManyToOne
    @JoinColumn(name="buildingObjectId")
    private BuildingObject buildingObject;

}
