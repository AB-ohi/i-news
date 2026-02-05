'use client'
import React, { useContext, useState } from "react";
import "./reg.css";
import Image from "next/image";
import logo_img from "../../../public/ImgForHome/reg_img.jpg";
import { CiSquareChevLeft } from "react-icons/ci";
import Link from "next/link";
import { AuthContext } from "../Context/AuthContext";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    
    const handelSubmitReg = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        let firebaseUid = "";
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const number = form.number.value;
        const password = form.password.value;
        const confirm_password = form.confirm_password.value;
        const displayName =  `${name}${Date.now().toString(36)+Math.random().toString(36).substring(2)}`
        
        // Validation
        if (!name || !email || !password || !confirm_password || !number) {
            setError("All fields are required");
            setLoading(false);
            return;
        }
        
        if (password !== confirm_password) {
            setError("Passwords don't match");
            setLoading(false);
            return;
        }
        
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }
        
        
        try {
            
            await createUser(email, password)
            .then((res =>{
                const user = res.user;
                firebaseUid = user.uid
                return updateProfile(user,{
                    displayName,
                    phoneNumber: number
                });
            }))
            const userData = {name, displayName, email, password, confirm_password, number, uid:firebaseUid };
            
            const response = await fetch('http://localhost:5000/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }
            
            const data = await response.json();
            setSuccess("Account created successfully!");
            
            setTimeout(() => {
                router.push('/');
            }, 1500);
            
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message || "Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
        
        console.log(userData);
    }
    
    return (
        <div className="reg_page">
            <div className="signUp_container">
                <form onSubmit={handelSubmitReg} className='sign_up_information'>
                    <Link href='/' className="text-4xl text-blue-900 font-light ">
                        <CiSquareChevLeft />
                    </Link>
                    
                    <h1>Sign Up</h1>
                    <p>Create your account to get started</p>

                    {success && (
                        <div className="success-message text-green-600 bg-green-100 p-3 rounded-md mb-4">
                            {success}
                        </div>
                    )}
                    
                    {error && (
                        <div className="error-message text-red-600 bg-red-100 p-3 rounded-md mb-4">
                            {error}
                        </div>
                    )}
                    {/* name */}
                    <div className="form_group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter your full name" 
                            required
                            disabled={loading}
                        />
                    </div>
                    {/* email */}
                    <div className="form_group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* phone */}
                    <div className="form_group">
                        <label>Phone Number</label>
                        <input 
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                          }}
                            type="text" 
                            name="number" 
                            placeholder="Enter your Phone Number" 
                            required
                            disabled={loading}
                        />
                    </div>
                    {/* pass */}
                    <div className="form_group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Create a password" 
                            required
                            disabled={loading}
                            minLength={6}
                        />
                    </div>
                    {/* confirm pass */}
                    <div className="form_group">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirm_password" 
                            placeholder="Confirm your password" 
                            required
                            disabled={loading}
                            minLength={6}
                        />
                    </div>

                    <button 
                        className="submit_btn" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <div className="login_link">
                        Already have an account? <Link href="/login">Sign In</Link>
                    </div>
                </form>

                <div className="img_for_singUp">
                    <div className="welcome_text">
                        <h2>Welcome to I News 24</h2>
                        <p>Your trusted news platform</p>
                    </div>
                    
                    <Image
                        src={logo_img}
                        alt="News registration"
                        priority
                        className="register-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;