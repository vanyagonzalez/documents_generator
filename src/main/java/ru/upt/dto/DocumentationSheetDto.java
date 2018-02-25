package ru.upt.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class DocumentationSheetDto extends BasicDocumentationSheetDto {

    /**
     * Номер листа проектной документации
     */
    private Long number;
    /**
     * Номер изменения листа проектной документации
     */
    private Long change;

    public DocumentationSheetDto(Long id,
                                 String name,
                                 List<BasicKindOfWorkDto> kindOfWorks,
                                 Long number,
                                 Long change) {
        super(id, name, kindOfWorks);
        this.number = number;
        this.change = change;
    }
}
