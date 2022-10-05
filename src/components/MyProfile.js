import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import StaffHeader from "./StaffHeader";

export default function MyProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dob, setDOB] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      First_Name: firstName,
      Last_Name: lastName,
      Date_of_Birth : dob,
      Employee_Number: localStorage.getItem("loggedUser"),
    };
    const url = `https://localhost:44303/api/Staff/UpdateStaff`;
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (result.status === 200) {
          getData();
          Clear();
          alert("Details updated successfully.");
        } else {
          alert("Some error occured. Try after sometime.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Clear = () => {
    setDOB('');
    setFirstName('');
    setlastName('');
  };

  const getData = () => {
    const data = {
        Employee_Number: localStorage.getItem("loggedUser")
    };
    const url = `https://localhost:44303/api/Staff/GetById`;
    axios
    .post(url, data)
      .then((result) => {
        const data = JSON.parse(result.data);
        if (result.status === 200) {
          setData(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <StaffHeader />
      <br></br>
      <form>
        <div
          class="form-row"
          style={{ width: "80%", backgroundColor: "white", margin: " auto" }}
        >
          <div class="form-group col-md-12">
            <h3>My profile</h3>
          </div>
          <div class="form-group col-md-4">
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="form-control"
              required
              value={firstName}
            />
          </div>
          <div class="form-group col-md-4">
          <input
              type="text"
              onChange={(e) => setlastName(e.target.value)}
              placeholder="Last Name"
              className="form-control"
              required
              value={lastName}
            />
          </div>
          <div class="form-group col-md-4">
          <input
              type="date"
              onChange={(e) => setDOB(e.target.value)}
              placeholder="Date of Birth"
              className="form-control"
              required
              value={dob}
            />
          </div>
          <div class="form-group col-md-6">
            <button
              className="btn btn-primary"
              style={{ width: "150px", float: "left" }}
              onClick={(e) => handleSave(e)}
            >
              Update
            </button>{" "}
            <button
              className="btn btn-danger"
              style={{ width: "150px" }}
              onClick={(e) => Clear(e)}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
      <br></br>
      {data ? (
        <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Employee Number</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Salary</th>
              <th scope="col">Experience</th>
              <th scope="col">Gender</th>
              <th scope="col">Qualification</th>
              {/* <th>Update</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{val.Employee_Number}</td>
                  <td>{val.First_Name}</td>
                  <td>{val.Last_Name}</td>
                  <td>{val.Date_of_Birth}</td>
                  <td>{val.Salary}</td>
                  <td>{val.Experience}</td>
                  <td>{val.Gender_Type}</td>
                  <td>{val.Level_Quali}</td>
                  {/* <td><button onClick={(e) => handleEdit(e)}>Edit</button></td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No data found"
      )}
    </Fragment>
  );
}
