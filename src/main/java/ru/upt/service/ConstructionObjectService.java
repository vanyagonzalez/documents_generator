package ru.upt.service;

import ru.upt.model.ConstructionObject;

import java.util.List;

public interface ConstructionObjectService {
    List<ConstructionObject> getConstructionObjects();
    ConstructionObject getConstructionObjectById(Long id);
}
