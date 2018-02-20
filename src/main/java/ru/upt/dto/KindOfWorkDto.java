package ru.upt.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class KindOfWorkDto extends BasicKindOfWorkDto {
    public KindOfWorkDto(Long id, String name) {
        super(id, name);
    }
}
