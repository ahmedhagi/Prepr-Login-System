import { Link } from "react-router-dom";
import "./home/home.css"

function Profile() {
  const user = JSON.parse(window.localStorage.getItem("user"));

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center">
        <div className=" d-flex bg-white p-3">
          <div className="d-grid text-center ">
            <Link to="/login">
              <button className="btn login px-3">Login</button>
            </Link>
          </div>
          <div className="text-center">
            <p class="or mx-3">or</p>
          </div>
          <div className="d-grid text-center">
            <Link to="/register">
              <button className="btn signup px-3">SignUp</button>
            </Link>
          </div>
        </div>
      </div>
      {user && (
        <div>
          <ul style={{ listStyle: "none" }}>
            <li>First Name: {user.first_name}</li>
            <li>Last Name: {user.last_name}</li>
            <li>Username: {user.user_name}</li>
            <li>Email: {user.email}</li>
            <li>User Type: {user.user_type}</li>
            <li>Language: {user.language}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
