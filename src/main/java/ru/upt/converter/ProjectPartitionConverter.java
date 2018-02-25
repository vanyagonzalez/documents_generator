package ru.upt.converter;

import ru.upt.dto.BasicProjectPartitionDto;
import ru.upt.dto.ProjectPartitionDto;
import ru.upt.model.ProjectPartition;

import java.util.stream.Collectors;

public class ProjectPartitionConverter {
    public static BasicProjectPartitionDto convertToBasicDto(ProjectPartition projectPartition) {
        return new BasicProjectPartitionDto(
                projectPartition.getId()
                , projectPartition.getName()
                , projectPartition.getProjectDocuments().stream().map(ProjectDocumentConverter::convertToBasicDto).collect(Collectors.toList())
        );
    }

    public static ProjectPartitionDto convertToDto(ProjectPartition projectPartition) {
        return new ProjectPartitionDto(
                projectPartition.getId(),
                projectPartition.getName(),
                projectPartition.getCode(),
                projectPartition.getProjectDocuments().stream().map(ProjectDocumentConverter::convertToBasicDto).collect(Collectors.toList())
        );
    }
}
