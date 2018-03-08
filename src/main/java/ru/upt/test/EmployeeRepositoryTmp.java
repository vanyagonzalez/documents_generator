package ru.upt.test;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

//@PreAuthorize("hasRole('ROLE_MANAGER')")
public interface EmployeeRepositoryTmp extends PagingAndSortingRepository<EmployeeTmp, Long> {
    @Override
//    @PreAuthorize("#employeeTmp?.manager == null or #employeeTmp?.manager?.name == authentication?.name")
    EmployeeTmp save(@Param("employeeTmp") EmployeeTmp employeeTmp);

    @Override
//    @PreAuthorize("@employeeRepository.findOne(#id)?.manager?.name == authentication?.name")
    void delete(@Param("id") Long id);

    @Override
//    @PreAuthorize("#employeeTmp?.manager?.name == authentication?.name")
    void delete(@Param("employeeTmp") EmployeeTmp employeeTmp);
}
