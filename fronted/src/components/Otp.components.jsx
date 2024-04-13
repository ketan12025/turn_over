import React, { useState } from "react";
import "./../styles/login.css"; // Import your CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OTPInput = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(8).fill(""));
  let user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 7) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtp = async (e) => {
    try {
      let res = await axios.post("http://localhost:5000/users/confirm/signUp", {
        email: user.email,
        otp: otp.join(""),
      });
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.data.token));
      navigate("/categories");
    } catch (e) {
      alert(e.response.data?.error?.message || "InternalServerError");
    }
  };

  function hideEmail(email) {
    let atIndex = email.indexOf("@");
    let hiddenPart = email.substring(3, atIndex).replace(/./g, "*"); // Replace all characters except the first one with *
    let hiddenEmail =
      email.substring(0, 3) + hiddenPart + email.substring(atIndex);
    return hiddenEmail;
  }
  return (
    <div className="login-form-container">
      <h1>Verify your email</h1>
      <p style={{ fontSize: "12px", textAlign: "center" }}>
        Enter the 8 digit code you have recieved on your email <br />
        {hideEmail(user.email)}
      </p>
      <div className="otp-input-container">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            className="otp-input"
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
      <p style={{ fontSize: "12px" }}>use this otp : {user.otp}</p>
      <button style={{ width: "100%" }} type="submit" onClick={handleOtp}>
        Sign Up
      </button>
    </div>
  );
};

export default OTPInput;
