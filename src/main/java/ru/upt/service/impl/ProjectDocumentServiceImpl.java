package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.ProjectDocument;
import ru.upt.repository.ProjectDocumentCrudRepository;
import ru.upt.service.ProjectDocumentService;

@Service
public class ProjectDocumentServiceImpl implements ProjectDocumentService {

    private final ProjectDocumentCrudRepository projectDocumentCrudRepository;

    @Autowired
    public ProjectDocumentServiceImpl(ProjectDocumentCrudRepository projectDocumentCrudRepository) {
        this.projectDocumentCrudRepository = projectDocumentCrudRepository;
    }

    @Override
    public ProjectDocument getById(Long id) {
        return projectDocumentCrudRepository.findOne(id);
    }
}
