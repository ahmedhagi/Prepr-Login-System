
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/forms/Login"
import SignUp from "./components/forms/SignUp"
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={null}>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
