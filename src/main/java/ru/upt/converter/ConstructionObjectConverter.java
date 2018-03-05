package ru.upt.converter;

import ru.upt.dto.BasicConstructionObjectDto;
import ru.upt.dto.BasicProjectPartitionDto;
import ru.upt.dto.ConstructionObjectDto;
import ru.upt.model.ConstructionObject;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ConstructionObjectConverter {
    public static BasicConstructionObjectDto convertToBasicDto(ConstructionObject constructionObject) {
        return new BasicConstructionObjectDto(constructionObject.getId(), constructionObject.getCode());
    }

    public static ConstructionObjectDto convertToDto(ConstructionObject constructionObject) {
        ConstructionObjectDto dto = new ConstructionObjectDto(constructionObject.getId()
                , constructionObject.getCode()
                , constructionObject.getName()
                , OrganizationConverter.convertToBasicDto(constructionObject.getCustomer())
                , OrganizationConverter.convertToBasicDto(constructionObject.getDeveloper())
                , constructionObject.getCopies()
        );
        dto.setProjectPartitions(constructionObject.getProjectPartitions().stream().map(ProjectPartitionConverter::convertToBasicDto).collect(Collectors.toList()));
        return dto;
    }

    public static ConstructionObject convertFromDto(ConstructionObjectDto constructionObjectDto) {
        return new ConstructionObject(
                constructionObjectDto.getId(),
                constructionObjectDto.getCode(),
                constructionObjectDto.getName(),
                OrganizationConverter.convertFromBasicDto(constructionObjectDto.getCustomer()),
                OrganizationConverter.convertFromBasicDto(constructionObjectDto.getDeveloper()),
                constructionObjectDto.getCopies()
        );
    }
}
