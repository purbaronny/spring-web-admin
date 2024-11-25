import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); 

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignIn = async () => {
        if (!validateEmail(email)) {
            setError('Invalid email address.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        setError('');

        try {
            const response = await axios.post('http://localhost:9000/api/v1/test/users/login', {
                email: email,
                password: password,
                loginType: ""
            });
            if (response.data) {
                alert('Login successful!');
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location = '/';
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        }
    };

    const handleGoogleLogin = async (response) => {
        try {
            const googleToken = response.credential;  // The token from Google OAuth
            const userData = jwtDecode(googleToken);
            console.log("usersrr: " + userData);
            const res = await axios.post('http://localhost:9000/api/v1/test/users/login', {
                email: userData.email,
                password: "",
                loginType: "Google"
            });
            if (res.data) {
                alert('Google login successful!');
                localStorage.setItem('user', JSON.stringify(res.data));
                window.location = '/dashboard';
            }
        } catch (err) {
            setError('Google login failed.');
            console.error(err);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                <div className="brand-logo">
                                    <img src="assets/images/logo.svg" alt="logo" />
                                </div>
                                <h4>Hello! Let's get started</h4>
                                <h6 className="fw-light">Sign in to continue.</h6>
                                <form className="pt-3">
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group position-relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control form-control-lg"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    < br/>
                                    {error && <div className="text-danger mb-3">{error}</div>}
                                    <div className="mt-3 d-grid gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-block btn-primary btn-lg fw-medium auth-form-btn"
                                            onClick={handleSignIn}
                                        >
                                            SIGN IN
                                        </button>
                                    </div>
                                    <div className="my-2 d-flex justify-content-between align-items-center">
                                        <div className="form-check">
                                            <label className="form-check-label text-muted">
                                                <input type="checkbox" className="form-check-input" /> Keep me signed in
                                            </label>
                                        </div>
                                        <a href="#" className="auth-link text-black">Forgot password?</a>
                                    </div>
                                    <div className="mb-2 d-grid gap-2">
                                        <GoogleLogin 
                                            onSuccess={handleGoogleLogin}
                                            onError={(error) => console.log('Login Failed', error)}
                                        />
                                    </div>
                                    <div className="text-center mt-4 fw-light">
                                        Don't have an account?{' '}
                                        <a onClick={() => (window.location = '/signUp')} className="text-primary" style={{ cursor: 'pointer' }}>
                                            Sign Up
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
