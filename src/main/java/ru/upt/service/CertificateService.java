package ru.upt.service;

import ru.upt.model.Certificate;

import java.util.List;

public interface CertificateService {
    List<Certificate> getAll();
    Certificate getById(Long id);
    Certificate save(Certificate certificate);
    void delete(Certificate certificate);
}
