package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.KindOfWork;
import ru.upt.repository.KindOfWorkCrudRepository;
import ru.upt.service.KindOfWorkService;

@Service
public class KindOfWorkServiceImpl implements KindOfWorkService {

    private final KindOfWorkCrudRepository kindOfWorkCrudRepository;

    @Autowired
    public KindOfWorkServiceImpl(KindOfWorkCrudRepository kindOfWorkCrudRepository) {
        this.kindOfWorkCrudRepository = kindOfWorkCrudRepository;
    }

    @Override
    public KindOfWork getById(Long id) {
        return kindOfWorkCrudRepository.findOne(id);
    }
}
