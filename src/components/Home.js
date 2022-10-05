import React from "react";

function Home() {
  return (
    <div style={{backgroundColor:"white", width:"80%", margin:"0 auto", borderRadius:"11px"}}>
      <div className="mt-4" style={{ margin: "0 auto", width: "430px" }}>
        <h3>Staff Management System</h3>
      </div>
      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">
            <div class="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://www.lionleaf.com/wp-content/uploads/2014/12/blue-website-buttons-2-1-1369225-m.jpg"
                class="img-fluid"
                alt="Phone image"
              />
            </div>
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>               
                <a
                  class="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: "55acee" }}
                  href="/admindashboard"
                  role="button"
                >
                  <i class="fab fa-twitter me-2"></i>Admin Login
                </a>
                <a
                  class="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: "#ffc107", color: "black" }}
                  href="/stafflogin"
                  role="button"
                >
                  <i class="fab fa-twitter me-2"></i>Staff Login
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
