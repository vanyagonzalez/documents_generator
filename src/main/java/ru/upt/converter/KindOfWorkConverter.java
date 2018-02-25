package ru.upt.converter;

import ru.upt.dto.*;
import ru.upt.model.Certificate;
import ru.upt.model.Confirmation;
import ru.upt.model.Employee;
import ru.upt.model.KindOfWork;

import java.util.ArrayList;
import java.util.List;

public class KindOfWorkConverter {
    public static BasicKindOfWorkDto convertToBasicDto(KindOfWork kindOfWork) {
        return new BasicKindOfWorkDto(kindOfWork.getId(), kindOfWork.getName());
    }

    public static KindOfWorkDto convertToDto(KindOfWork kindOfWork) {
        List<BasicEmployeeDto> otherRepresentatives = new ArrayList<>();
        if (kindOfWork.getOtherRepresentatives() != null && !kindOfWork.getOtherRepresentatives().isEmpty()) {
            for (Employee employee : kindOfWork.getOtherRepresentatives()) {
                otherRepresentatives.add(new BasicEmployeeDto(employee.getId(), employee.getSurname(), employee.getName(), employee.getMiddleName()));
            }
        }

        List<BasicCertificateDto> certificates = new ArrayList<>();
        if (kindOfWork.getCertificates() != null && !kindOfWork.getCertificates().isEmpty()) {
            for (Certificate certificate : kindOfWork.getCertificates()) {
                certificates.add(new BasicCertificateDto(certificate.getId(), certificate.getMaterial()));
            }
        }
        List<BasicConfirmationDto> confirmations = new ArrayList<>();
        if (kindOfWork.getConfirmations() != null && !kindOfWork.getConfirmations().isEmpty()) {
            for (Confirmation confirmation : kindOfWork.getConfirmations()) {
                confirmations.add(new BasicConfirmationDto(confirmation.getId(), confirmation.getName()));
            }
        }

        return new KindOfWorkDto(
                kindOfWork.getId(),
                kindOfWork.getName(),
                kindOfWork.getAmountOfWork(),
                kindOfWork.getMeasureUnit(),
                new BasicOrganizationDto(kindOfWork.getExecutor().getId(), kindOfWork.getExecutor().getName()),
                new BasicEmployeeDto(kindOfWork.getExecutorRepresentative().getId(),
                        kindOfWork.getExecutorRepresentative().getSurname(),
                        kindOfWork.getExecutorRepresentative().getName(),
                        kindOfWork.getExecutorRepresentative().getMiddleName()),
                otherRepresentatives,
                certificates,
                confirmations,
                kindOfWork.getAdditionalReason(),
                kindOfWork.getBeginDate(),
                kindOfWork.getEndDate(),
                kindOfWork.getPresentationDate()
        );
    }
}
