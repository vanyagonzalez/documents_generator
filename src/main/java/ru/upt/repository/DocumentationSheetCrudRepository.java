package ru.upt.repository;

import org.springframework.data.repository.CrudRepository;
import ru.upt.model.DocumentationSheet;

public interface DocumentationSheetCrudRepository extends CrudRepository<DocumentationSheet, Long> {
}
