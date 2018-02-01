package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.BuildingObject;
import ru.upt.repository.BuildingObjectRepository;
import ru.upt.service.BuildingObjectService;

import java.util.List;

@Service
public class BuildingObjectServiceImpl implements BuildingObjectService {
    private final BuildingObjectRepository buildingObjectRepository;

    @Autowired
    public BuildingObjectServiceImpl(BuildingObjectRepository buildingObjectRepository) {
        this.buildingObjectRepository = buildingObjectRepository;
    }

    @Override
    public List<BuildingObject> getAllBuildingObjects() {
        return buildingObjectRepository.getAllBuildingObjects();
    }

    @Override
    public BuildingObject getBuildingObjectById(Integer id) {
        return buildingObjectRepository.getBuildingObjectById(id);
    }
}
