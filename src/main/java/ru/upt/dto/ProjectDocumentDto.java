package ru.upt.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class ProjectDocumentDto extends BasicProjectDocumentDto {
    public ProjectDocumentDto(Long id, String name, List<BasicDocumentationSheetDto> documentationSheets) {
        super(id, name, documentationSheets);
    }
}
