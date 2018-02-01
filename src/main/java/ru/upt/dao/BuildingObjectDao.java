package ru.upt.dao;

import java.util.List;

public interface BuildingObjectDao {
    List<BuildingObjectDao> getAllBuildingObjects();
    BuildingObjectDao getBuildingObjectById(Integer id);
}
