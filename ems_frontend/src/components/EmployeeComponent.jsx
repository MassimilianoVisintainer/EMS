import { useState } from "react"
import { createEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";


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

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function saveEmployee(e) {

    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };

      console.log(employee)
      createEmployee(employee).then((response) => {
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      });
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
                placeholder="Enter Employee First Name"
                name="firstName"
                value={firstName}
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                onChange={handleFirstName}>
              </input>
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>
            <div className="form-group mb-2">
              <label className="form-label"> Last Name:</label>
              <input
                type="text"
                placeholder="Enter Employee Last Name"
                name="lastName"
                value={lastName}
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                onChange={handleLastName}>
              </input>
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>
            <div className="form-group mb-2">
              <label className="form-label"> Email:</label>
              <input
                type="text"
                placeholder="Enter Employee Email"
                name="email"
                value={email}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                onChange={handleEmail}>
              </input>
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <button onClick={saveEmployee}>Add Employee</button>
          </form>
        </div>
      </div>
    </div>
  </div>
)

}

export default EmployeeComponent