package ru.upt.repository;

import ru.upt.model.BuildingObject;

import java.util.List;

public interface BuildingObjectRepository {
    List<BuildingObject> getAllBuildingObjects();
    BuildingObject getBuildingObjectById(Integer id);
}
