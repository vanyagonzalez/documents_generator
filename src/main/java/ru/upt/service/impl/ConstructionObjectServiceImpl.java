package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.dto.ConstructionObjectDto;
import ru.upt.model.ConstructionObject;
import ru.upt.repository.ConstructionObjectCrudRepository;
import ru.upt.service.ConstructionObjectService;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConstructionObjectServiceImpl implements ConstructionObjectService {
    private final ConstructionObjectCrudRepository constructionObjectCrudRepository;

    @Autowired
    public ConstructionObjectServiceImpl(ConstructionObjectCrudRepository constructionObjectCrudRepository) {
        this.constructionObjectCrudRepository = constructionObjectCrudRepository;
    }

    @Override
    public List<ConstructionObject> getConstructionObjects() {
        List<ConstructionObject> target = new ArrayList<ConstructionObject>();
        constructionObjectCrudRepository.findAll().forEach(target::add);
        return target;
    }

    @Override
    public ConstructionObject getConstructionObjectById(Long id) {
        return constructionObjectCrudRepository.findOne(id);
    }
}
