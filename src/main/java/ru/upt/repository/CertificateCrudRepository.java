package ru.upt.repository;

import org.springframework.data.repository.CrudRepository;
import ru.upt.model.Certificate;

public interface CertificateCrudRepository extends CrudRepository<Certificate, Long> {
}
