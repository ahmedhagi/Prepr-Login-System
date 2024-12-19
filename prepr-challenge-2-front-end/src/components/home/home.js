import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import "../forms/form.css";
import "./home.css"

function Home() {
  return (
    <div className="background">
    <div className="min-vh-100 d-flex justify-content-center align-items-center ">
      <div className="bg-white p-3">
        <div className="d-grid text-center mt-3">
          <Link to="/login">
            <button className="btn login">Login</button>
          </Link>
        </div>
        <div className="text-center">
          <p class="or">or</p>
        </div>
        <div className="d-grid text-center mb-2">
          <Link to="/register">
            <button className="btn signup">SignUp</button>
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Home;
