package ru.upt.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class ProjectPartitionDto extends BasicProjectPartitionDto {
    public ProjectPartitionDto(Long id, String name, List<BasicProjectDocumentDto> projectDocuments) {
        super(id, name, projectDocuments);
    }
}
