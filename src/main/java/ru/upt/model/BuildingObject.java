package ru.upt.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class BuildingObject {
    @Id
    @GeneratedValue
    private Long buildingObjectId;
    private String name;
    @OneToMany(targetEntity=Partition.class, mappedBy="buildingObject", fetch= FetchType.EAGER)
    private List<Partition> partitions;

    public BuildingObject() {
    }

    public BuildingObject(String name, List<Partition> partitions) {
        this.name = name;
        this.partitions = partitions;
    }
}
