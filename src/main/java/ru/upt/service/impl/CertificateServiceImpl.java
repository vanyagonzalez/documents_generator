package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.Certificate;
import ru.upt.repository.CertificateCrudRepository;
import ru.upt.service.CertificateService;

import java.util.ArrayList;
import java.util.List;

@Service
public class CertificateServiceImpl implements CertificateService {
    private final CertificateCrudRepository certificateCrudRepository;

    @Autowired
    public CertificateServiceImpl(CertificateCrudRepository certificateCrudRepository) {
        this.certificateCrudRepository = certificateCrudRepository;
    }

    @Override
    public List<Certificate> getAll() {
        List<Certificate> target = new ArrayList<Certificate>();
        certificateCrudRepository.findAll().forEach(target::add);
        return target;
    }

    @Override
    public Certificate getById(Long id) {
        return certificateCrudRepository.findOne(id);
    }

}
