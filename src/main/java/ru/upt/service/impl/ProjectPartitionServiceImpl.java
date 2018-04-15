package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.ProjectDocument;
import ru.upt.model.ProjectPartition;
import ru.upt.repository.ProjectDocumentCrudRepository;
import ru.upt.repository.ProjectPartitionCrudRepository;
import ru.upt.service.ProjectDocumentService;
import ru.upt.service.ProjectPartitionService;

@Service
public class ProjectPartitionServiceImpl implements ProjectPartitionService {

    private final ProjectPartitionCrudRepository projectPartitionCrudRepository;
    private final ProjectDocumentService projectDocumentService;

    @Autowired
    public ProjectPartitionServiceImpl(ProjectPartitionCrudRepository projectPartitionCrudRepository,
                                       ProjectDocumentService projectDocumentService) {
        this.projectPartitionCrudRepository = projectPartitionCrudRepository;
        this.projectDocumentService = projectDocumentService;
    }

    @Override
    public ProjectPartition getById(Long id) {
        return projectPartitionCrudRepository.findOne(id);
    }

    @Override
    public ProjectPartition save(ProjectPartition projectPartition) {
        return projectPartitionCrudRepository.save(projectPartition);
    }

    @Override
    public void delete(ProjectPartition projectPartition) {
        projectPartition = projectPartitionCrudRepository.findOne(projectPartition.getId());
        for (ProjectDocument projectDocument : projectPartition.getProjectDocuments()) {
            projectDocumentService.delete(projectDocument);
        }
        projectPartitionCrudRepository.delete(projectPartition);
    }
}
