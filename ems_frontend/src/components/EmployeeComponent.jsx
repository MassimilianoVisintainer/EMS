import { useState,useEffect } from "react"
import { createEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../services/EmployeeService";


function EmployeeComponent() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
 
  const {id} = useParams();

  const [errors, setErrors] = useState({
    "firstName": '',
    "lastName": '',
    "email": ''
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {   
      getEmployeeById(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch(error => {
          console.error(error); 
        });
    }
  }, [id]);

 

  function saveEmployee(e) {

    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };

     if (id) {
      updateEmployee(id,employee).then((response) => {
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      })

     } else {
      createEmployee(employee).then((response) => {
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      });
     }
      navigator("/");
    }

  }

function validateForm() {

  let isValid = true;
  const errosCopy = { ...errors };

  if (firstName.trim()) {
    errosCopy.firstName = '';
  } else {
    errosCopy.firstName = "First Name is required"
    isValid = false;
  }

  if (lastName.trim()) {
    errosCopy.lastName = '';
  } else {
    errosCopy.lastName = "Last name is required";
    isValid = false;
  }

  if (email.trim()) {
    errosCopy.email = '';
  } else {
    errosCopy.email = "Email is required";
    isValid = false;
  }

  setErrors(errosCopy);
  return isValid;
}

function pageTitle() {

  if(id) {
    return <h2 className="text-center">Update Employee</h2>
  } else {
    return <h2 className="text-center">Add Employee</h2>
  }
}

return (
  <div className="container">
    <br></br>
    <div className="row">
      <div className="card col-md-6 offset-md-3 offset-md-3 ">
        {
          pageTitle()
        }
        <div className="card-body">
          <form>
            <div className="form-group mb-2">
              <label className="form-label"> First Name:</label>
              <input
                type="text"
                placeholder='Enter Employee First Name'
                name="firstName"
                value={firstName}
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                onChange={(e) => setFirstName(e.target.value)}>
              </input>
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>
            <div className="form-group mb-2">
              <label className="form-label"> Last Name:</label>
              <input
                type="text"
                placeholder= 'Enter Employee Last Name'
                name="lastName"
                value={lastName}
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                onChange={(e) => setLastName(e.target.value)}>
              </input>
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>
            <div className="form-group mb-2">
              <label className="form-label"> Email:</label>
              <input
                type="text"
                placeholder= 'Enter Employee Email'
                name="email"
                value={email}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                onChange={(e) => setEmail(e.target.value)}>
              </input>
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <button type="button" className="btn btn-dark" onClick={saveEmployee}>
             Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
)

}

export default EmployeeComponent