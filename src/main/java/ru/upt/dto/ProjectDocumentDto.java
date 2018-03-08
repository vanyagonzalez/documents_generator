package ru.upt.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ProjectDocumentDto extends BasicProjectDocumentDto {
    /**
     * Шифр проектной документации
     */
    private String code;
    /**
     * Стадия проектирования
     */
    private String phase;
    /**
     * Автор проектной документации
     */
    private BasicEmployeeDto author;
    /**
     * Ответственный представитель Заказчика
     */
    private BasicEmployeeDto customerRepresentative;
    /**
     * Ответственный представитель Застройщика
     */
    private BasicEmployeeDto developerRepresentative;

    private BasicProjectPartitionDto projectPartition;

    public ProjectDocumentDto(Long id,
                              String name,
                              List<BasicDocumentationSheetDto> documentationSheets,
                              String code,
                              String phase,
                              BasicEmployeeDto author,
                              BasicEmployeeDto customerRepresentative,
                              BasicEmployeeDto developerRepresentative,
                              BasicProjectPartitionDto projectPartition) {
        super(id, name, documentationSheets);
        this.code = code;
        this.phase = phase;
        this.author = author;
        this.customerRepresentative = customerRepresentative;
        this.developerRepresentative = developerRepresentative;
        this.projectPartition = projectPartition;
    }
}
