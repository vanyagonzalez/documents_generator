package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.BuildingObject;
import ru.upt.repository.BuildingObjectCrudRepository;
import ru.upt.service.BuildingObjectService;

import java.util.ArrayList;
import java.util.List;

@Service
public class BuildingObjectServiceImpl implements BuildingObjectService {
    private final BuildingObjectCrudRepository buildingObjectCrudRepository;

    @Autowired
    public BuildingObjectServiceImpl(BuildingObjectCrudRepository buildingObjectCrudRepository) {
        this.buildingObjectCrudRepository = buildingObjectCrudRepository;
    }

    @Override
    public List<BuildingObject> getBuildingObjects() {
        List<BuildingObject> target = new ArrayList<BuildingObject>();
        buildingObjectCrudRepository.findAll().forEach(target::add);
        return target;
    }

    @Override
    public BuildingObject getBuildingObjectById(Long id) {
        return buildingObjectCrudRepository.findOne(id);
    }
}
