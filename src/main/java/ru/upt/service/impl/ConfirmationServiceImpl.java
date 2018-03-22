package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.Confirmation;
import ru.upt.repository.ConfirmationCrudRepository;
import ru.upt.service.ConfirmationService;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConfirmationServiceImpl implements ConfirmationService {
    private final ConfirmationCrudRepository confirmationCrudRepository;

    @Autowired
    public ConfirmationServiceImpl(ConfirmationCrudRepository confirmationCrudRepository) {
        this.confirmationCrudRepository = confirmationCrudRepository;
    }
    @Override
    public List<Confirmation> getAll() {
        List<Confirmation> target = new ArrayList<Confirmation>();
        confirmationCrudRepository.findAll().forEach(target::add);
        return target;
    }

    @Override
    public Confirmation getById(Long id) {
        return confirmationCrudRepository.findOne(id);
    }
}
