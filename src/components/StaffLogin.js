import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function StaffLogin() {
  const history = useHistory();
  const [empNo, setEmpNo] = useState("");

  const handleLogin = (e) => {
    debugger;
    let error = '';
    if(empNo === '')
    error = error + 'Employee Number';
    
    if(error.length > 0)
    {
      error = error + ' can not be blank';
      alert(error);
      return;
    }

    e.preventDefault();
    const data = {
      Employee_Number: empNo
    };
    const url = `https://localhost:44303/api/Staff/Login`;
    axios
      .post(url, data)
      .then((result) => {
        if (result.status === 200) {   
            localStorage.setItem("loggedUser",empNo);       
            history.push("/staffdashboard");          
        }
        else
        {
          alert('Invalid user');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{backgroundColor:"white", width:"80%", margin:"0 auto", borderRadius:"11px"}}>
      <div className="mt-4" style={{ margin: "0 auto", width: "430px" }}>
        <h3>Staff Login Panel</h3>
      </div>

      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">
            <div class="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                class="img-fluid"
                alt="Phone image"
              />
            </div>
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                <div class="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example13"
                    class="form-control form-control-lg"
                    onChange={(e) => setEmpNo(e.target.value)}
                  />
                  <label class="form-label" for="form1Example13">
                    Employee Number
                  </label>
                </div>

                <div class="d-flex justify-content-around align-items-center mb-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                      checked
                    />
                    <label class="form-check-label" for="form1Example3">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                  <a href="#!">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary btn-lg btn-block"
                  onClick={(e) => handleLogin(e)}
                >
                  Sign in
              </button>

                            
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StaffLogin;
