package ru.upt.service;

import ru.upt.model.ProjectDocument;

public interface ProjectDocumentService {
    ProjectDocument getById(Long id);
    ProjectDocument save(ProjectDocument projectDocument);
}
