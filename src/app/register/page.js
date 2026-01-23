'use client'
import React, { useContext, useState } from "react";
import "./reg.css";
import Image from "next/image";
import logo_img from "../../../public/ImgForHome/reg_img.jpg";
import { CiSquareChevLeft } from "react-icons/ci";
import Link from "next/link";
import { AuthContext } from "../Context/AuthContext";
import { useRouter } from "next/router";

const Register = () => {
    const {createUser} = useContext(AuthContext);
    const navigate = useRouter();
    const [error, setError] = useState()
    const handelSubmitReg = (e)=>{
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm_password = form.confirm_password.value;
        
        const userData = {name, email, password, confirm_password};
        if(password !== confirm_password){
            setError("password doesn't match")
            return
        }
        else{
            setError('')
            createUser(email,password)
            fetch('',{
                method:"POST",
                headers:{
                     "content-type": "application/json"
                },
                body:JSON.stringify(userData)
            }).then(res => res.json());
            navigate.push('./')
        }
        console.log(userData)
    }
  return (
    <div className="reg_page">
      <div className="signUp_container">
        <form onSubmit={handelSubmitReg} className='sign_up_information'>
            <Link href='/' className="text-4xl text-blue-900 font-light "><CiSquareChevLeft/></Link>
          <h1>Sign Up</h1>
          <p>Create your account to get started</p>

          <div className="form_group">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="Enter your full name" />
          </div>

          <div className="form_group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="Enter your email" />
          </div>

          <div className="form_group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Create a password" />
          </div>

          <div className="form_group">
            <label>Confirm Password</label>
            <input type="password" name="confirm_password" placeholder="Confirm your password" />
            <p className="text-red-600">{error}</p>
          </div>

          <button className="submit_btn">Create Account</button>

          <div className="login_link">
            Already have an account? <a href="/login">Sign In</a>
          </div>
        </form>

        <div className="img_for_singUp">
          <div className="welcome_text">
            <h2>Welcome to I News 24</h2>
            <p>Your trusted news platform</p>
          </div>
          
          <Image
            className=" "
            src={logo_img}
            alt="logo"
          />
          
        </div>

      </div>
    </div>
  );
};

export default Register;