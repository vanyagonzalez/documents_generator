package ru.upt.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class EmployeeDto extends BasicEmployeeDto {
    /**
     * Номер приказа о назначении на должность
     */
    private String orderNumber;
    /**
     * Дата приказа о назначении на должность
     */
    private Date orderDate;

    public EmployeeDto(Long id,
                       BasicPersonDto personDto,
                       BasicOrganizationDto organizationDto,
                       String position,
                       String orderNumber,
                       Date orderDate) {
        super(id, personDto, organizationDto, position);
        this.orderNumber = orderNumber;
        this.orderDate = orderDate;
    }
}
