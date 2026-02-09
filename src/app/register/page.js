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
        
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const number = form.number.value;
        const password = form.password.value;
        const confirm_password = form.confirm_password.value;
        const displayName = `${name}${Date.now().toString(36)+Math.random().toString(36).substring(2)}`;
        
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
            const userCredential = await createUser(email, password);
            const user = userCredential.user;
            const firebaseUid = user.uid;
            
            await updateProfile(user, {
                displayName,
                phoneNumber: number
            });
            
            console.log('✅ Firebase user created:', firebaseUid);
            
            const userData = {
                name,
                displayName,
                email,
                password,
                number,
                uid: firebaseUid
            };
            
            console.log('📤 Sending to MongoDB:', userData);
            
            const response = await fetch('http://localhost:5000/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            
            const data = await response.json();
            console.log('📥 MongoDB response:', data);
            
            if (!response.ok) {
                throw new Error(data.message || 'Database registration failed');
            }
            
            console.log('✅ User saved to MongoDB');
            
            // Step 4: Success
            setSuccess("Account created successfully! Redirecting...");
            form.reset();
          
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
            
        } catch (error) {
            console.error("❌ Registration error:", error);
            setError(error.message || "Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="reg_page">
            <div className="signUp_container">
                <form onSubmit={handelSubmitReg} className='sign_up_information'>
                    <Link href='/' className="text-4xl text-blue-900 font-light">
                        <CiSquareChevLeft />
                    </Link>
                    
                    <h1>Sign Up</h1>
                    <p>Create your account to get started</p>

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="loading-message bg-blue-100 text-blue-700 p-4 rounded-md mb-4 flex items-center gap-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                            <div>
                                <p className="font-semibold">Creating your account...</p>
                                <p className="text-sm">Please wait, this may take a moment</p>
                            </div>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="success-message text-green-700 bg-green-100 p-4 rounded-md mb-4 flex items-center gap-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <p className="font-semibold">{success}</p>
                            </div>
                        </div>
                    )}
                    
                    {/* Error Message */}
                    {error && (
                        <div className="error-message text-red-700 bg-red-100 p-4 rounded-md mb-4 flex items-center gap-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <div>
                                <p className="font-semibold">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Form Fields */}
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

                    <div className="form_group">
                        <label>Phone Number</label>
                        <input 
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, "");
                            }}
                            type="text" 
                            name="number" 
                            placeholder="Enter your Phone Number" 
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form_group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Create a password (min 6 characters)" 
                            required
                            disabled={loading}
                            minLength={6}
                        />
                    </div>

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
                        className={`submit_btn ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Creating Account...
                            </span>
                        ) : (
                            'Create Account'
                        )}
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