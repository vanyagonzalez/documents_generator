package ru.upt.service;

import ru.upt.model.DocumentationSheet;

public interface DocumentationSheetService {
    DocumentationSheet getById(Long id);
    DocumentationSheet save(DocumentationSheet documentationSheet);
    void delete(DocumentationSheet documentationSheet);
}
