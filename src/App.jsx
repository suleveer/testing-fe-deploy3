import './App.css'
import axios from 'axios'
import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
  axios.get("http://localhost:3000/employees")
    .then(res => setEmployees(res.data))
    .catch(err => console.error("GET /employees failed:", err));
    }, []);


   const handleSubmit = async (e) => {
    e.preventDefault(); // stops the page reload
    const formData = new FormData(e.target); // grabs data from the form
    const data = Object.fromEntries(formData.entries()); // turns it into an object

    try {
      await axios.post("http://localhost:3000/employees", data);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error adding employee");
    }
  };
  return (
    <>
    
    <section>
        <h2>Add New Employee</h2>
        <form id={"addEmp"} onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input type={"text"} name={"first_name"} required /><br></br>

            <label>Last Name:</label>
            <input type={"text"} name={"last_name"} required /><br></br>

            <label>Email:</label>
            <input type={"email"} name={"email"} required /><br></br>

            <label >Birthdate:</label>
            <input type={"date"} name={"birthdate"} required /><br></br>

            <label >Salary</label>
            <input type={"number"} name={"salary"} step={"0.01"} required /><br></br>

            <button className={"btn btn-primary"} type={"submit"}>Submit</button>

        </form>
    </section>
    <section>
        <h2>Employee List</h2>
        <table id={"employeeTable"}>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Birthdate</th>
                    <th>Salary</th>
                </tr>
            </thead>
            <tbody id={"employeeTableBody"}>
              {employees.map(emp => (
                  <tr key={emp.id ?? `${emp.email}-${emp.first_name}`}>
                    <td>{emp.first_name}</td>
                    <td>{emp.last_name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.birthdate}</td>    {/* or format if you care */}
                    <td>{emp.salary}</td>
                  </tr>
                ))}
            </tbody>
        </table>
    </section>
    </>
  )
}

export default App
