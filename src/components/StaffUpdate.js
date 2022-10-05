import React, { Fragment, useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import {useParams} from 'react-router-dom';

export default function StaffUpdate() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dob, setDOB] = useState("");
  const [experience, setExperience] = useState("");
  const [genderID, setGenderID] = useState("");
  const [qualificationID, setQualificationID] = useState("");
  const [genderData, setGenderData] = useState([]);
  const [dobtext, setDOBText] = useState(false);
  const [qualificationData, setQualificationData] = useState([]);

  const params = useParams();

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
    const data = {
        Employee_Number: params.id 
    };
    const url = `https://localhost:44303/api/Staff/GetById`;
    axios
    .post(url, data)
      .then((result) => {
        const data = JSON.parse(result.data);
        if (result.status === 200) {
          setFirstName(data[0].First_Name);
          setlastName(data[0].Last_Name);
          setDOB(data[0].Date_of_Birth);
          setExperience(data[0].Experience);
          setGenderID(data[0].Gender_ID);
          setQualificationID(data[0].Qualification_ID);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      Employee_Number: params.id,
      First_Name: firstName,
      Last_Name: lastName,
      Date_of_Birth: dob,
      Experience: experience,
      Gender_ID: genderID,
      Qualification_ID: qualificationID,
    };
    const url = `https://localhost:44303/api/Staff`;
    axios
      .put(url, data)
      .then((result) => {
        if (result.status === 200) {
          getData();
          Clear();
          alert("Staff Updated");
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
            <h3>Update Staff</h3>
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
            {
              !dobtext 
            ?
          <input
              type="text"
              onClick={() => setDOBText(true)}
              placeholder="First Name"
              className="form-control"
              required
              value={dob}
              readOnly
            />
            :
            <input
              type="date"
              onChange={(e) => setDOB(e.target.value)}
              placeholder="Date of Birth"
              className="form-control"
              required
              value={dob}
            />
}
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
              value={genderID}
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
              value={qualificationID}
            >
              <option value="0">--Select Qualification--</option>
              {qualificationData && qualificationData.length > 0
                ? qualificationData.map((item, index) => {
                    return (
                      <option key={index} value={item.ID}>
                        {item.Level_Quali}
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
    </Fragment>
  );
}
