package com.example.emsbackend.service;

import com.example.emsbackend.dto.EmployeeDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IEmployeeService {

    EmployeeDto createEmployee( EmployeeDto employeeDto);

    EmployeeDto getEmployeeById (Long id);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(Long id,EmployeeDto employeeDtoUpdated);

    void deleteEmployee(Long id);
}
