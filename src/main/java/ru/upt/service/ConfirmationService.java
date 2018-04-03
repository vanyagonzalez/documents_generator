package ru.upt.service;

import ru.upt.model.Confirmation;

import java.util.List;

public interface ConfirmationService {
    List<Confirmation> getAll();
    Confirmation getById(Long id);
    Confirmation save(Confirmation confirmation);
    void delete(Confirmation confirmation);
}
