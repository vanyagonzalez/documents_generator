package ru.upt.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class DocumentationSheetDto extends BasicDocumentationSheetDto {

    public DocumentationSheetDto(Long id, String name, List<BasicKindOfWorkDto> kindOfWorks) {
        super(id, name, kindOfWorks);
    }
}
