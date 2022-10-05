import React, { Fragment, useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Staff() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dob, setDOB] = useState("");
  const [experience, setExperience] = useState("");
  const [genderID, setGenderID] = useState("");
  const [qualificationID, setQualificationID] = useState("");
  const [data, setData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [qualificationData, setQualificationData] = useState([]);

  useEffect(() => {
    getData();
    getGender();
    getQualification();
  }, []);

  const getGender = () => {
    const url = `https://localhost:44303/api/Gender`;
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        if (result.status === 200) {
          setGenderData(JSON.parse(data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getQualification = () => {
    const url = `https://localhost:44303/api/Qualification`;
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        if (result.status === 200) {
          setQualificationData(JSON.parse(data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = () => {
    const url = `https://localhost:44303/api/Staff`;
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        if (result.status === 200) {
          setData(JSON.parse(data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (e,id) => {
    e.preventDefault();
    window.location.href = "/staffupdate/" + id;
  }
  const handleDelete = (e,id) => {
    e.preventDefault();
    if (window.confirm("Are you sure to delete this record?"))
{
    axios
      .delete(`https://localhost:44303/api/Staff/${id}`)
      .then((result) => {
        if (result.status === 200) {
          getData();         
          alert("Staff deleted");
          window.location.href = "/staff";
        } else {
          alert("Some error occured.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      Employee_Number: uuidv4(),
      First_Name: firstName,
      Last_Name: lastName,
      Date_of_Birth: dob,
      Experience: experience,
      Gender_ID: genderID,
      Qualification_ID: qualificationID,
    };
    const url = `https://localhost:44303/api/Staff`;
    axios
      .post(url, data)
      .then((result) => {
        if (result.status === 200) {
          getData();
          Clear();
          alert("Staff Added");
          window.location.href = "/staff";
        } else {
          alert("Some error occured.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Clear = () => {
    setFirstName("");
    setlastName("");
    setDOB("");
    setExperience("");
    setGenderID("");
    setQualificationID("");
  };

  return (
    <Fragment>
      <AdminHeader />
      <br></br>
      <form>
        <div
          class="form-row"
          style={{ width: "80%", backgroundColor: "white", margin: " auto" }}
        >
          <div class="form-group col-md-12">
            <h3>Add New Staff</h3>
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
          <div class="form-group col-md-4">
            <input
              type="number"
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Experience"
              className="form-control"
              required
              value={experience}
            />
          </div>
          <div class="form-group col-md-4">
            <select
              class="form-control"
              aria-label="Default select example"
              onChange={(e) => setGenderID(e.target.value)}
            >
              <option value="0">--Select Gender--</option>
              {genderData && genderData.length > 0
                ? genderData.map((item, index) => {
                    return (
                      <option key={index} value={item.ID}>
                        {item.Gender_Type}
                      </option>
                    );
                  })
                : ""}
            </select>
          </div>
          <div class="form-group col-md-4">
            <select
              class="form-control"
              aria-label="Default select example"
              onChange={(e) => setQualificationID(e.target.value)}
            >
              <option value="0">--Select Qualification--</option>
              {qualificationData && qualificationData.length > 0
                ? qualificationData.map((item, index) => {
                    return (
                      <option key={index} value={item.ID}>
                        {/* {item.Level_Quali} */}
                        {item.Level_Desc}
                      </option>
                    );
                  })
                : ""}
            </select>
          </div>

          <div class="form-group col-md-6">
            <button
              className="btn btn-primary"
              style={{ width: "150px", float: "left" }}
              onClick={(e) => handleSave(e)}
            >
              Save
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
              <th colSpan={2}>Actions</th>
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
                  <td>
                    <button onClick={(e) => handleEdit(e, val.Employee_Number)}>Edit</button>{" "}
                  </td>
                  <td>
                    <button onClick={(e) => handleDelete(e, val.ID)}>
                      Delete
                    </button>{" "}
                  </td>
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
