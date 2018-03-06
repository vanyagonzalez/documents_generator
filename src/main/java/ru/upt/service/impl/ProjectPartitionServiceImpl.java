package ru.upt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.upt.model.ProjectPartition;
import ru.upt.repository.ProjectPartitionCrudRepository;
import ru.upt.service.ProjectPartitionService;

@Service
public class ProjectPartitionServiceImpl implements ProjectPartitionService {

    private final ProjectPartitionCrudRepository projectPartitionCrudRepository;

    @Autowired
    public ProjectPartitionServiceImpl(ProjectPartitionCrudRepository projectPartitionCrudRepository) {
        this.projectPartitionCrudRepository = projectPartitionCrudRepository;
    }

    @Override
    public ProjectPartition getById(Long id) {
        return projectPartitionCrudRepository.findOne(id);
    }

    @Override
    public ProjectPartition save(ProjectPartition projectPartition) {
        return projectPartitionCrudRepository.save(projectPartition);
    }
}
