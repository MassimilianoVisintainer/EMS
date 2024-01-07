import { useEffect, useState } from "react"
import { listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../services/EmployeeService";

function ListEmployeeComponent() {

    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();


    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee() {
        navigator("addEmployee");
    }

    function updateEmployee(id) {
        navigator(`updateEmployee/${id}`);

    }

    function removeEmployee(id) {
        
        deleteEmployee(id).then((response) => {
            console.log(response.data);
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    }


    return (
        <div className="container">
            <h2 className="text-center">List of Employees</h2>
            <div className="d-grid gap-2 d-md-flex ">
                <button type="button" className="btn btn-dark" onClick={addNewEmployee}>Add Employee</button>
            </div>
            <br></br>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button type="button" className="btn btn-dark" onClick={() => updateEmployee(employee.id)} >Update</button>
                                    <button type="button" className="btn btn-secondary" style={{marginLeft: '10px'}} onClick={() => removeEmployee(employee.id)} >Delete</button>
                                </td>
                            </tr>)
                    }

                </tbody>

            </table>

        </div>
    )
}

export default ListEmployeeComponent