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
     * Должность
     */
    private String position;
    /**
     * Номер приказа о назначении на должность
     */
    private String orderNumber;
    /**
     * Дата приказа о назначении на должность
     */
    private Date orderDate;

    /**
     * Список организаций
     */
    private List<BasicOrganizationDto> organizations;

    public EmployeeDto(Long id, String surname, String name, String middleName, String position, String orderNumber, Date orderDate, List<BasicOrganizationDto> organizations) {
        super(id, surname, name, middleName);
        this.position = position;
        this.orderNumber = orderNumber;
        this.orderDate = orderDate;
        this.organizations = organizations;
    }
}
