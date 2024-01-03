package com.example.emsbackend.service;

import com.example.emsbackend.dto.EmployeeDto;
import com.example.emsbackend.exception.ResourceNotFoundException;
import com.example.emsbackend.mapper.EmployeeMapper;
import com.example.emsbackend.model.Employee;
import com.example.emsbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


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

    @Override
    public EmployeeDto getEmployeeById( Long id){
        Employee employee = employeeRepository.getReferenceById(id);

        if (employee == null) {
            throw new ResourceNotFoundException("Employee is not existing with the following id :" + id);
        }
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees(){

        List<Employee> employees = employeeRepository.findAll();


        List<EmployeeDto> employeeDtos = employees.stream().map((employee -> EmployeeMapper.mapToEmployeeDto(employee))).collect(Collectors.toList());

        return employeeDtos;
    }

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDtoUpdated) {

        Employee employee = employeeRepository.getReferenceById(id);

        if (employee == null) {
            throw new ResourceNotFoundException("Employee is not existing with the following id :" + id);
        }

        employee.setFirstName(employeeDtoUpdated.getFirstName());
        employee.setLastName(employeeDtoUpdated.getLastName());
        employee.setEmail(employeeDtoUpdated.getEmail());

        Employee updateEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updateEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.getReferenceById(id);

        if( employee == null ) {
            throw new ResourceNotFoundException("Employee is not existing with the following id :" + id);
        }

        employeeRepository.deleteById(id);

    }


}
