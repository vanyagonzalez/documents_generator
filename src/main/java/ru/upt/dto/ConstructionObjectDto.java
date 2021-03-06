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
public class ConstructionObjectDto extends BasicConstructionObjectDto {
    private String name;
    private BasicOrganizationDto customer;
    private BasicOrganizationDto developer;
    private List<BasicProjectPartitionDto> projectPartitions;
    private Long copies;

    public ConstructionObjectDto(Long id, String code, String name, BasicOrganizationDto customer, BasicOrganizationDto developer, Long copies) {
        super(id, code);
        this.name = name;
        this.customer = customer;
        this.developer = developer;
        this.copies = copies;
    }
}
