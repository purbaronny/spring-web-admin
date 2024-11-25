import React, { useState } from "react"
import { FaGoogle } from "react-icons/fa"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [googleToken, setGoogleToken] = useState(null);

  const loginOnClick = () => {
    window.location = "/login";
  };

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(password)) {
      newErrors.password =
        "Password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character";
    }

    if (password !== confirmPassword) {
      newErrors.password = "Passwords do not match";
    }

    if (!agree) {
      newErrors.agree = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const userData = {
        email,
        password,
        name: "AA ku",
        googleId: null,
        role: "user",
      };

      try {
        const response = await axios.post(
          "http://localhost:9000/api/v1/test/users",
          userData
        );
        console.log("Sign up successful:", response.data);
        alert("Sign up successful! You can now log in.");
        window.location = "/login";
      } catch (error) {
        console.error("Error during sign up:", error);
        if (error.response) {
          setErrors({ apiError: error.response.data.message || "Failed to sign up" });
        } else {
          setErrors({ apiError: "Something went wrong. Please try again later." });
        }
      }
    }
  };

  const handelLogin=(googleData)=>{
    const userData = jwtDecode(googleData);
    console.log(userData);
  }

  const handleGoogleLogin = (response) => {
    const googleToken = response.credential;
    const userData = jwtDecode(googleToken);
    console.log("usersrr: " + userData);
    setGoogleToken(userData);
    // Use the token to send to your server to register the user
    axios
      .post("http://localhost:9000/api/v1/test/users", {
        email: userData.email,
        password: "", // You can handle password in another way or let Google handle it
        name: userData.name,
        googleId: "",
        role: "user",
      })
      .then((res) => {
        console.log("Google Sign Up successful:", res.data);
        alert("Google Sign Up successful! You can now log in.");
        window.location = "/login";
      })
      .catch((err) => {
        console.error("Google Sign Up failed:", err);
      });
  };

  return (
    <GoogleOAuthProvider clientId="364218727000-tthuiq6qbc6om5uuptmq8514i1pknu2r.apps.googleusercontent.com">
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                    <img src="assets/images/logo.svg" alt="logo" />
                  </div>
                  <h4>New here?</h4>
                  <h6 className="fw-light">Signing up is easy. It only takes a few steps</h6>
                  <form className="pt-3" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                          />
                          I agree to all Terms & Conditions
                        </label>
                      </div>
                      {errors.agree && <small className="text-danger">{errors.agree}</small>}
                    </div>
                    <div className="mt-3 d-grid gap-2">
                      <button
                        type="submit"
                        className="btn btn-block btn-primary btn-lg fw-medium auth-form-btn"
                      >
                        SIGN UP
                      </button>
                    </div>
                    {errors.apiError && <div className="alert alert-danger mt-3">{errors.apiError}</div>}
                    <div className="mt-4 text-center">
                      <hr />
                      <div className="mt-3 d-grid gap-2">
                        <span>OR</span>
                      </div>
                    </div>
                    <div className="mt-3 d-grid gap-2">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            handleGoogleLogin(credentialResponse);
                          }}
                        onError={(error) => console.log("Google login error:", error)}
                        useOneTap
                      />                      
                    </div>
                    <div className="text-center mt-4 fw-light">
                      Already have an account?{" "}
                      <a onClick={loginOnClick} className="text-primary">
                        Login
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
