
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/forms/Login"
import SignUp from "./components/forms/SignUp"
import Home from './components/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
