package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.DocumentationSheet;
import ru.upt.model.ProjectDocument;
import ru.upt.repository.ProjectDocumentCrudRepository;
import ru.upt.service.DocumentationSheetService;
import ru.upt.service.ProjectDocumentService;

@Service
public class ProjectDocumentServiceImpl implements ProjectDocumentService {

    private final ProjectDocumentCrudRepository projectDocumentCrudRepository;
    private final DocumentationSheetService documentationSheetService;

    @Autowired
    public ProjectDocumentServiceImpl(ProjectDocumentCrudRepository projectDocumentCrudRepository,
                                      DocumentationSheetService documentationSheetService) {
        this.projectDocumentCrudRepository = projectDocumentCrudRepository;
        this.documentationSheetService = documentationSheetService;
    }

    @Override
    public ProjectDocument getById(Long id) {
        return projectDocumentCrudRepository.findOne(id);
    }

    @Override
    public ProjectDocument save(ProjectDocument projectDocument) {
        return projectDocumentCrudRepository.save(projectDocument);
    }

    @Override
    public void delete(ProjectDocument projectDocument) {
        for (DocumentationSheet documentationSheet : projectDocument.getDocumentationSheets()) {
            documentationSheetService.delete(documentationSheet);
        }
        projectDocumentCrudRepository.delete(projectDocument);
    }
}
