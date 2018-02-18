package ru.upt.converter;

import ru.upt.dto.BasicConstructionObjectDto;
import ru.upt.model.ConstructionObject;

public class ConstructionObjectConverter {
    public static BasicConstructionObjectDto converToBasicDto (ConstructionObject constructionObject) {
        return new BasicConstructionObjectDto(constructionObject.getId(), constructionObject.getCode());
    }
}
