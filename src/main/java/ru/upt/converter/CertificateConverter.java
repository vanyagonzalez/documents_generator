package ru.upt.converter;

import ru.upt.dto.BasicCertificateDto;
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
}
