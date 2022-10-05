import React, {Fragment} from "react";
import { useHistory, Link } from "react-router-dom";

function AdminHeader() {
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('username');
        history.push("/");
    }

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Staff Management System
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Welcome <span className="sr-only">(current)</span>
                Admin
              </a>
            </li>
            <li className="nav-item">
              <Link to="/staff" className="nav-link">
                Staff Management
              </Link>
            </li>            
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={(e) => logout(e)}>
              Logout
            </button>
          </form>
        </div>
      </nav>
    </Fragment>
  );
}

export default AdminHeader;
