package ru.upt.converter;

import ru.upt.dto.BasicKindOfWorkDto;
import ru.upt.dto.KindOfWorkDto;
import ru.upt.model.KindOfWork;

public class KindOfWorkConverter {
    public static BasicKindOfWorkDto convertToBasicDto(KindOfWork kindOfWork) {
        return new BasicKindOfWorkDto(kindOfWork.getId(), kindOfWork.getName());
    }

    public static KindOfWorkDto convertToDto(KindOfWork kindOfWork) {
        return new KindOfWorkDto(kindOfWork.getId(), kindOfWork.getName());
    }
}
