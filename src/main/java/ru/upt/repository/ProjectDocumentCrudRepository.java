package ru.upt.repository;

import org.springframework.data.repository.CrudRepository;
import ru.upt.model.ProjectDocument;

public interface ProjectDocumentCrudRepository extends CrudRepository<ProjectDocument, Long> {
}
