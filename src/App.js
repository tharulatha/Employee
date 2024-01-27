import { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFromData] = useState({
    id: new Date().getTime(),
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    phone: "",
    martialStatus: "",
    modeOfContact: [],
    ImmdediateJoiner: "",
  });

  const [employeeList, setEmployeeList] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [updateMode, setUpdateMode] = useState(false)


  const {
    gender,
    modeOfContact,
    martialStatus,
    firstname,
    lastname,
    middlename,
    ImmdediateJoiner,
    phone,
  } = formData;

  const handleChange = (e) => {
    // console.log(e);

    if (e.target.name === "modeOfContact") {
      let copiedData = { ...formData };
      if (e.target.checked) {
        copiedData.modeOfContact.push(e.target.value);
      } else {
        copiedData.modeOfContact = copiedData.modeOfContact.filter(
          (element) => element !== e.target.value
        );
      }
      setFromData({ ...copiedData });
    } else {
      setFromData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      let editedData = employeeList.map((list) => list.id === editingEmployee.id ? formData : list);
      console.log(editedData);
      setEmployeeList([...editedData])
      // setEmployeeList((prevList) =>
      //   prevList.map((item) =>
      //     item.id === editingEmployee.id ? formData : item
      //   )
      // );
      setFromData({
        id: new Date().getTime(),
        firstname: "",
        middlename: "",
        lastname: "",
        gender: "",
        phone: "",
        martialStatus: "",
        modeOfContact: [],
        ImmdediateJoiner: "",
      });
      setEditingEmployee(null);
      setUpdateMode(false)
    } else {
      setUpdateMode(false)
      setEmployeeList([...employeeList, formData]);
      setFromData({
        id: new Date().getTime(),
        firstname: "",
        middlename: "",
        lastname: "",
        gender: "",
        phone: "",
        martialStatus: "",
        modeOfContact: [],
        ImmdediateJoiner: "",
      });
    }
    
   
    console.log(employeeList);
  };

  const handleClear = () => {
    setFromData({
      firstname: "",
      middlename: "",
      lastname: "",
      gender: "",
      phone: "",
      martialStatus: "",
      modeOfContact: [],
      ImmdediateJoiner: "",
    });
  };

  const handleDelete = (id) => {
    setEmployeeList([...employeeList.filter((list) => list.id !== id)]);
  };

  const handleEdit = (id) => {
    setUpdateMode(true);
    const employeeToEdit = employeeList.find((item) => item.id === id);
    console.log(employeeToEdit);
    setFromData({ ...employeeToEdit });
    setEditingEmployee(employeeToEdit);
  };

  return (
    <div className="container">
      <h1>Employee Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstname"
            value={firstname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Middle Name</label>
          <input
            type="text"
            className="form-control"
            name="middlename"
            value={middlename}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastname"
            value={lastname}
            onChange={handleChange}
          />
        </div>

        <label className="form-label">Gender</label>
        <div>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleChange}
            checked={gender === "male"}
          />
          <label>Male</label>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleChange}
            checked={gender === "female"}
          />
          <label>Female</label>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            value="others"
            onChange={handleChange}
            checked={gender === "others"}
          />
          <label>Others</label>
        </div>

        <div>
          <label className="form-label">Phone Number</label>
          <input
            type="number"
            className="form-control"
            name="phone"
            onChange={handleChange}
            value={phone}
          />
        </div>

        <label className="form-label">Martial Status</label>
        <select
          name="martialStatus"
          className="form-control"
          onChange={handleChange}
          value={martialStatus}
        >
          <option value="married">Married</option>
          <option value="single">Single</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>

        <label className="form-label">Mode of Contact</label>
        <div>
          <input
            type="checkbox"
            name="modeOfContact"
            value="email"
            onChange={handleChange}
            checked={modeOfContact.indexOf("email") !== -1}
          />
          <label>Email</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="modeOfContact"
            value="phonenumber"
            onChange={handleChange}
            checked={modeOfContact.indexOf("phonenumber") !== -1}
          />
          <label>Phone</label>
        </div>

        <label className="form-label">Immediate Joiner</label>
        <div>
          <input
            type="radio"
            name="ImmdediateJoiner"
            value="yes"
            onChange={handleChange}
            checked={ImmdediateJoiner === "yes"}
          />
          <label>Yes</label>
        </div>
        <div>
          <input
            type="radio"
            name="ImmdediateJoiner"
            value="no"
            onChange={handleChange}
            checked={ImmdediateJoiner === "no"}
          />
          <label>No</label>
        </div>
        <div className="button-group">
          <button type="submit">{updateMode ? "Update" : "Submit"}</button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>

      <h1>List of Employee</h1>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Martial Status</th>
            <th>Mode Of Contact</th>
            <th>Immdediate Joiner</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((item, index) => (
            <tr key={index}>
              <td>{item.firstname}</td>
              <td>{item.middlename}</td>
              <td>{item.lastname}</td>
              <td>{item.gender}</td>
              <td>{item.phone}</td>
              <td>{item.martialStatus}</td>
              <td>{item.modeOfContact.join(" , ")}</td>
              <td>{item.ImmdediateJoiner}</td>
              <td className="btn-group">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
