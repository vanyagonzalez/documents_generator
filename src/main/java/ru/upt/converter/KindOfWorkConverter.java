package ru.upt.converter;

import ru.upt.dto.BasicKindOfWorkDto;
import ru.upt.model.KindOfWork;

public class KindOfWorkConverter {
    public static BasicKindOfWorkDto convertToBasicDto(KindOfWork kindOfWork) {
        return new BasicKindOfWorkDto(kindOfWork.getId(), kindOfWork.getName());
    }
}
