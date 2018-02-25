package ru.upt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicCertificateDto {
    /**
     * идентификатор
     */
    private Long id;
    /**
     * Материал -- Наименование сертифицируемого материала
     */
    @NonNull
    private String material;
}
