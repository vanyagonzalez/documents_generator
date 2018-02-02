package ru.upt.repository.impl;

import org.springframework.stereotype.Repository;
import ru.upt.config.AppDataSource;
import ru.upt.model.BuildingObject;
import ru.upt.repository.BuildingObjectRepository;

import java.util.List;

@Repository
public class BuildingObjectRepositoryImpl implements BuildingObjectRepository {

    @Override
    public List<BuildingObject> getAllBuildingObjects() {
        return AppDataSource.getBuildingObjects();
    }

    @Override
    public BuildingObject getBuildingObjectById(Integer id) {
        return AppDataSource.getBuildingObjectsById(id);
    }
}
