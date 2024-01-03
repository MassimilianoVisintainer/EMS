package com.example.emsbackend.service;

import com.example.emsbackend.dto.EmployeeDto;

import java.util.List;

public interface IEmployeeService {

    EmployeeDto createEmployee( EmployeeDto employeeDto);

    EmployeeDto getEmployeeById (Long id);

    List<EmployeeDto> getAllEmployees();
}
