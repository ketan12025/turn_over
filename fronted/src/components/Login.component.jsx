import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./../styles/login.css"; // Import your CSS file for styling
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    console.log("Form values:", values);
    try {
      let res = await axios.post("http://localhost:5000/users/login", {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.data.token));
      navigate("/categories");
    } catch (e) {
      alert(e.response.data?.error?.message || "InternalServerError");
    }
  };

  return (
    <div className="login-form-container">
      <h1>LOGIN</h1>
      <p className="welcome-text">Welcome back to ECOMMERCE</p>
      <p className="welcome-motto">The next generation business marketplace</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="input-block">
            <p className="label">Email:</p>
            <Field type="email" id="email" name="email" />
            <ErrorMessage
              className="error-message"
              name="email"
              component="div"
            />
          </div>

          <div className="input-block">
            <p className="label">Password:</p>
            <Field type="password" id="password" name="password" />
            <ErrorMessage
              className="error-message"
              name="password"
              component="div"
            />
          </div>

          <button type="submit">Login</button>
        </Form>
      </Formik>

      <p className="have-account-text">
        {" "}
        Don't Have an Account ?{" "}
        <Link to="/signUp" style={{ textDecoration: "none", color: "inherit" }}>
          SIGN UP
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
