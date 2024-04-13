import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header.component";
import LoginForm from "./components/Login.component";
import SignUpForm from "./components/signUp.component";
import OTPInput from "./components/Otp.components";
import Category from "./components/Category.component";

function App() {
  let token = JSON.parse(localStorage.getItem("token"));
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/signUp/confirm" element={<OTPInput />} />
        <Route
          path="/categories"
          element={token?.length ? <Category /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
