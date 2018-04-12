package ru.upt.converter;

import ru.upt.dto.*;
import ru.upt.model.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class KindOfWorkConverter {
    public static BasicKindOfWorkDto convertToBasicDto(KindOfWork kindOfWork) {
        return new BasicKindOfWorkDto(kindOfWork.getId(), kindOfWork.getName());
    }

    public static KindOfWorkDto convertToDto(KindOfWork kindOfWork) {
        List<BasicEmployeeDto> otherRepresentatives = new ArrayList<>();
        if (kindOfWork.getOtherRepresentatives() != null && !kindOfWork.getOtherRepresentatives().isEmpty()) {
            for (Employee employee : kindOfWork.getOtherRepresentatives()) {
                otherRepresentatives.add(
                        new BasicEmployeeDto(
                                employee.getId(),
                                PersonConverter.convertToBasicDto(employee.getPerson()),
                                OrganizationConverter.convertToBasicDto(employee.getOrganization()),
                                employee.getPosition()
                        )
                );
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

        BasicOrganizationDto executor = kindOfWork.getExecutor() != null ?
                new BasicOrganizationDto(kindOfWork.getExecutor().getId(), kindOfWork.getExecutor().getName()) : null;

        Employee executorRepresentative = kindOfWork.getExecutorRepresentative();
        BasicEmployeeDto executorRepresentativeDto = executorRepresentative != null ?
                new BasicEmployeeDto(
                        executorRepresentative.getId(),
                        PersonConverter.convertToBasicDto(executorRepresentative.getPerson()),
                        OrganizationConverter.convertToBasicDto(executorRepresentative.getOrganization()),
                        executorRepresentative.getPosition()
                ) : null;

        return new KindOfWorkDto(
                kindOfWork.getId(),
                kindOfWork.getName(),
                kindOfWork.getAmountOfWork(),
                kindOfWork.getMeasureUnit(),
                executor,
                executorRepresentativeDto,
                otherRepresentatives,
                certificates,
                confirmations,
                kindOfWork.getAdditionalReason(),
                kindOfWork.getBeginDate(),
                kindOfWork.getEndDate(),
                kindOfWork.getPresentationDate(),
                DocumentationSheetConverter.convertToBasicDto(kindOfWork.getDocumentationSheet())
        );
    }

    public static KindOfWork convertFromDto(KindOfWorkDto kindOfWorkDto) {
        Set<Employee> otherRepresentatives = kindOfWorkDto.getOtherRepresentatives() != null && !kindOfWorkDto.getOtherRepresentatives().isEmpty() ?
                kindOfWorkDto.getOtherRepresentatives().stream().map(EmployeeConverter::convertFromBasicDto).collect(Collectors.toSet()) : null;

        Set<Certificate> certificates = kindOfWorkDto.getCertificates() != null && !kindOfWorkDto.getCertificates().isEmpty() ?
                kindOfWorkDto.getCertificates().stream().map(CertificateConverter::convertFromBasicDto).collect(Collectors.toSet()) : null;

        Set<Confirmation> confirmations = kindOfWorkDto.getConfirmations() != null && !kindOfWorkDto.getConfirmations().isEmpty() ?
                kindOfWorkDto.getConfirmations().stream().map(ConfirmationConverter::convertFromBasicDto).collect(Collectors.toSet()) : null;

        return new KindOfWork(
                kindOfWorkDto.getName(),
                kindOfWorkDto.getAmountOfWork(),
                kindOfWorkDto.getMeasureUnit(),
                OrganizationConverter.convertFromBasicDto(kindOfWorkDto.getExecutor()),
                EmployeeConverter.convertFromBasicDto(kindOfWorkDto.getExecutorRepresentative()),
                otherRepresentatives,
                certificates,
                confirmations,
                kindOfWorkDto.getAdditionalReason(),
                kindOfWorkDto.getBeginDate(),
                kindOfWorkDto.getEndDate(),
                kindOfWorkDto.getPresentationDate(),
                DocumentationSheetConverter.convertFromBasicDto(kindOfWorkDto.getDocumentationSheet())
                );
    }
}
