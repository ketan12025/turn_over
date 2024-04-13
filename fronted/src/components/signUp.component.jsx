import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./../styles/login.css"; // Import your CSS file for styling
import axios from "axios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      let res = await axios.post("http://localhost:5000/users/signUp", values);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("token", JSON.stringify(res.data.data.token));
      navigate("/signUp/confirm");
    } catch (e) {
      alert(e.response.data?.error?.message || "InternalServerError");
    }
  };

  return (
    <div className="login-form-container">
      <h1>Create Your Account</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="input-block">
            <p className="label">Name:</p>
            <Field type="text" id="name" name="name" />
            <ErrorMessage
              className="error-message"
              name="name"
              component="div"
            />
          </div>

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

          <button type="submit">Sign Up</button>
        </Form>
      </Formik>

      <p className="have-account-text">
        {" "}
        Have an Account ?{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
          LOGIN
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
