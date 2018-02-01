package ru.upt.service;

import ru.upt.model.BuildingObject;
import ru.upt.repository.BuildingObjectRepository;

import java.util.List;

public interface BuildingObjectService {
    List<BuildingObject> getAllBuildingObjects();
    BuildingObject getBuildingObjectById(Integer id);
}
