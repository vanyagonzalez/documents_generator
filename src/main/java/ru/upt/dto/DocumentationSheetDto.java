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
public class DocumentationSheetDto extends BasicDocumentationSheetDto {

    /**
     * Номер листа проектной документации
     */
    private Long number;
    /**
     * Номер изменения листа проектной документации
     */
    private Long changeNumber;

    private BasicProjectDocumentDto projectDocument;

    public DocumentationSheetDto(Long id,
                                 String name,
                                 List<BasicKindOfWorkDto> kindOfWorks,
                                 Long number,
                                 Long changeNumber,
                                 BasicProjectDocumentDto projectDocument) {
        super(id, name, kindOfWorks);
        this.number = number;
        this.changeNumber = changeNumber;
        this.projectDocument = projectDocument;
    }
}
