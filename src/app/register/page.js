import React from "react";
import "./reg.css";
import Image from "next/image";
import reg_img from "../../../public/all_img/regbg.png";
import logo_img from "../../../public/ImgForHome/INewsLogo.png";

const Register = () => {
  return (
    <div className="reg_page">
      <div className="signUp_container">
        <div className='sign_up_information'>
          <h1>Sign Up</h1>
          <p>Create your account to get started</p>

          <div className="form_group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>

          <div className="form_group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form_group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" />
          </div>

          <div className="form_group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" />
          </div>

          <button className="submit_btn">Create Account</button>

          <div className="login_link">
            Already have an account? <a href="#">Sign In</a>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="img_for_singUp">
          
          <Image
            className="w-[35%] absolute top-1/4 left-1/2 transform -translate-x-1/2 rounded-full"
            src={logo_img}
            alt="logo"
          />
          
          <div className="welcome_text">
            <h2>Welcome to iNews</h2>
            <p>Your trusted news platform</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;