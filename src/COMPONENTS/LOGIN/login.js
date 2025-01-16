import React, { useState } from "react";
import "./login.css";
import axios from "../AUTHENTICATION/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AUTHENTICATION/AuthProvider";
import CAPTCHA from "./CAPTCHA/Captcha";
import Swal from "sweetalert2";


export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "gita@gmail.com",
    password: "Gita@12345",
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });
  const [message, setMessage] = useState(null);

  // FOR CAPTCHA
  const [captchaInput, setCaptchaInput] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleCaptchaGenerated = (generatedCaptcha) => {
    setGeneratedCaptcha(generatedCaptcha); // Store the generated CAPTCHA
    setCaptchaVerified(false); // Reset CAPTCHA verification
  };

  const validatePassword = (value) => {
    const maxLength = 18;
    const minLength = 4;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (value.length < minLength) {
      return `Password must be at least ${minLength} characters long`;
    }
    if (value.length > maxLength) {
      return `Password must not be more than ${maxLength} characters long`;
    }
    if (!hasUpperCase) {
      return `Password must contain at least one uppercase character`;
    }
    if (!hasLowerCase) {
      return `Password must contain at least one lowercase character`;
    }
    if (!hasNumber) {
      return `Password must contain at least one number`;
    }
    if (!hasSpecialCharacters) {
      return `Password must contain at least one special character`;
    }
    return null;
  };

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return `Email is not of the correct format`;
    }
    return null;
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      const passwordError = validatePassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
      }));
    }

    if (name === "username") {
      const emailError = validateEmail(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: emailError,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordError = validatePassword(formData.password);
    const emailError = validateEmail(formData.username);

    if (passwordError || emailError) {
      setErrors({
        username: emailError,
        password: passwordError,
      });
      return;
    }

    // CAPTCHA validation
    if (captchaInput !== generatedCaptcha) {
      // alert("Incorrect CAPTCHA");
      Swal.fire({
        title: 'Error!',
        text:"Captcha didn't match",
        icon: 'error',
        timer: 1500,
      })
      return;
    }

    try {
      const response = await axios.post("/generateToken", formData);

      if (response.status === 200 && response.data.token) {
        console.log("login data: ", response.data);
        localStorage.setItem("data", JSON.stringify(response.data));
        login(response.data.token);
        setMessage("Login successful");
        setErrors({ username: null, password: null });

        if (response.data.role === "ROLE_ADMIN") {
          navigate("/admin-dashboard");
        } else if (response.data.role === "ROLE_USER") {
          navigate("/user-dashboard");
        }
      } else {
        setMessage("Invalid credentials");
        alert("Invalid credentials");
      }
    } catch (err) {
      setMessage(null);
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Invalid username or password",
      }));
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: `url('medical.webp') no-repeat center center fixed`,
        backgroundSize: 'cover',
      }}
    >
      <div
        className="bg-white p-4 rounded shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1
          className="mb-4"
          style={{ fontSize: "1.8rem", color: "#333" }}
        >
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 text-left">
            <label
              htmlFor="username"
              style={{ fontWeight: "bold", color: "#333" }}
            >
              Username
            </label>
            <input
              type="email"
              id="username"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <p className="text-danger">{errors.username}</p>
            )}
          </div>
          <div className="form-group mb-3 text-left">
            <label
              htmlFor="password"
              style={{ fontWeight: "bold", color: "#333" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
          </div>
          <div className="form-group mb-3 text-left">
            <label htmlFor="captchaInput" style={{ fontWeight: "bold", color: "#333" }}>
              Enter CAPTCHA
            </label>
            <input
              type="text"
              id="captchaInput"
              className="form-control"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
            <CAPTCHA onCaptchaGenerated={handleCaptchaGenerated} />
          </div>
          <button
            type="submit"
            className="btn w-100 mt-3"
            style={{
              background: "linear-gradient(135deg,rgb(36, 138, 120),rgb(224, 228, 234))",
              color: "#fff",
              fontSize: "1rem",
              padding: "0.8rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(135deg,rgb(36, 138, 120),rgb(224, 228, 234))")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(135deg,rgb(36, 138, 120),rgb(224, 228, 234))")
            }
          >
            Login
          </button>
        </form>
      </div>
    </div>
    
  );
}
