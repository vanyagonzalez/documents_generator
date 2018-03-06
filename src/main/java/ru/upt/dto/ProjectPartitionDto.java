package ru.upt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ProjectPartitionDto extends BasicProjectPartitionDto {
    private String code;
    private BasicConstructionObjectDto constructionObject;

    public ProjectPartitionDto(Long id,
                               String name,
                               String code,
                               List<BasicProjectDocumentDto> projectDocuments,
                               BasicConstructionObjectDto constructionObject) {
        super(id, name, projectDocuments);
        this.code = code;
        this.constructionObject = constructionObject;
    }
}
