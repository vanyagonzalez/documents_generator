package ru.upt.service;

import ru.upt.model.ProjectPartition;

public interface ProjectPartitionService {
    ProjectPartition getById(Long id);
    ProjectPartition save(ProjectPartition projectPartition);
}
