package ru.upt.service;

import ru.upt.model.BuildingObject;

import java.util.List;

public interface BuildingObjectService {
    List<BuildingObject> getBuildingObjects();
    BuildingObject getBuildingObjectById(Long id);
}
