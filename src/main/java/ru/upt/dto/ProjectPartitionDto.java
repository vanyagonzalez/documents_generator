package ru.upt.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class ProjectPartitionDto extends BasicProjectPartitionDto {
    private String code;

    public ProjectPartitionDto(Long id,
                               String name,
                               String code,
                               List<BasicProjectDocumentDto> projectDocuments) {
        super(id, name, projectDocuments);
        this.code = code;
    }
}
