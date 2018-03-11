package ru.upt.converter;

import ru.upt.dto.BasicCertificateDto;
import ru.upt.dto.BasicConfirmationDto;
import ru.upt.model.Confirmation;

public class ConfirmationConverter {
    public static BasicConfirmationDto convertToBasicDto(Confirmation confirmation) {
        return new BasicConfirmationDto(confirmation.getId(), confirmation.getName());
    }

    public static Confirmation convertFromBasicDto(BasicConfirmationDto basicConfirmationDto) {
        if (basicConfirmationDto == null || basicConfirmationDto.getId() == null) {
            return null;
        }
        return new Confirmation(basicConfirmationDto.getId(), basicConfirmationDto.getName());
    }
}
