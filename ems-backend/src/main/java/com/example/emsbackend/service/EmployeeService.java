package com.example.emsbackend.service;

import com.example.emsbackend.dto.EmployeeDto;
import com.example.emsbackend.mapper.EmployeeMapper;
import com.example.emsbackend.model.Employee;
import com.example.emsbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EmployeeService implements IEmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee( EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee employeeCreated = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(employeeCreated);

    }
}
