package ru.upt.converter;

import ru.upt.dto.BasicCertificateDto;
import ru.upt.dto.CertificateDto;
import ru.upt.model.Certificate;

public class CertificateConverter {
    public static BasicCertificateDto convertToBasicDto(Certificate certificate) {
        return new BasicCertificateDto(certificate.getId(), certificate.getMaterial());
    }

    public static Certificate convertFromBasicDto(BasicCertificateDto basicCertificateDto) {
        if (basicCertificateDto == null || basicCertificateDto.getId() == null) {
            return null;
        }
        return new Certificate(basicCertificateDto.getId(), basicCertificateDto.getMaterial());
    }

    public static CertificateDto convertToDto(Certificate certificate) {
        return new CertificateDto(
                certificate.getId(),
                certificate.getMaterial(),
                certificate.getStandardDocument(),
                certificate.getDocumentKind(),
                certificate.getDocumentNumber(),
                certificate.getDocumentDate(),
                certificate.getDocumentEndDate(),
                certificate.getMaterialVolume(),
                certificate.getMeasureUnit(),
                certificate.getDocumentCopy()
        );
    }
}
