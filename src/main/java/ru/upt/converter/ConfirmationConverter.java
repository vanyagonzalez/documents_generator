package ru.upt.converter;

import ru.upt.dto.BasicCertificateDto;
import ru.upt.dto.BasicConfirmationDto;
import ru.upt.dto.ConfirmationDto;
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

    public static ConfirmationDto convertToDto(Confirmation confirmation) {
        return new ConfirmationDto(
                confirmation.getId(),
                confirmation.getName(),
                confirmation.getNumber(),
                confirmation.getIssueDate(),
                confirmation.getCopy()
        );
    }

    public static Confirmation convertFromDto(ConfirmationDto confirmationDto) {
        return new Confirmation(
                confirmationDto.getId(),
                confirmationDto.getName(),
                confirmationDto.getNumber(),
                confirmationDto.getIssueDate(),
                confirmationDto.getCopy()
        );
    }
}
