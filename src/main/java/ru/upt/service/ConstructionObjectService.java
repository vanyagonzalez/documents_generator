package ru.upt.service;

import ru.upt.dto.ConstructionObjectDto;
import ru.upt.model.ConstructionObject;

import java.util.List;

public interface ConstructionObjectService {
    List<ConstructionObject> getAll();
    ConstructionObject getById(Long id);
    ConstructionObject save(ConstructionObject constructionObject);
}
