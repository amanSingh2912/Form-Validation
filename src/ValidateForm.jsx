import React from "react";
import { useState } from "react";

export default function ValidateForm() {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    contact: "",
    dob: "",
    gender: ""
  });

  const [error, setError] = useState({});

  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  }

  const isValidContact = (contact) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
  }

  const isValidPassword = (password) => {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRgex = /[0-9]/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRgex.test(password) &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password)
    )
  }
  const validateFormData = () => {
    let newError = {};

    if (!formData.firstname) {
      newError.firstname = "first name is required";
    }
    if (!formData.lastname) {
      newError.lastname = "last name is required";
    }
    if (!formData.email) {
      newError.email = "email is required";
    } else if (!isValidEmail(formData.email)) {
      newError.email = "invalid email format"
    }
    if (!formData.password) {
      newError.password = "password is required";
    } else if (!isValidPassword(formData.password)) {
      newError.password = "Password must be at least 8 character long, contain at least 1 symbol, 1 number, 1 lowercase and 1 uppercase";
    }
    if (!formData.confirmpassword) {
      newError.confirmpassword = "Please confirm the password again";
    } else if (formData.confirmpassword !== formData.password) {
      newError.confirmpassword = "Password and confirm password must be same";
    }
    if (!formData.contact) {
      newError.contact = "phone number is required";
    } else if (!isValidContact(formData.contact)) {
      newError.contact = "phone number must be of 10 digit";
    }
    if (!formData.dob) {
      newError.dob = "date of birth is required";
    }
    if (!formData.gender) {
      newError.gender = "Please select your gender";
    } else if (formData.gender === "select") {
      newError.gender = "Please select your gender";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFormData();
    if (isValid) {
      console.log("Form Submitted", formData);
      alert("Form Submitted")
    } else {
      console.log("Form Validation Failed");
    }
  }

  return <div className="container">
    <form className="form" onSubmit={handleSubmit}>
      <h1>Signup Form</h1>
      <div className="line" />
      <div className="field">
        <label htmlFor="firstname">First Name</label>
        <input type="text" name="firstname" id="firstname" placeholder="enter your first name" value={formData.firstname} onChange={handleChange} />
        {error.firstname && <div className="error">{error.firstname}</div>}
      </div>

      <div className="field">
        <label htmlFor="lastname" >Last Name</label>
        <input type="text" name="lastname" id="lastname" placeholder="enter your last name" value={formData.lastname} onChange={handleChange} />
        {error.lastname && <div className="error">{error.lastname}</div>}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" placeholder="enter your email id" value={formData.email} onChange={handleChange} />
        {error.email && <div className="error">{error.email}</div>}
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder="enter a password" value={formData.password} onChange={handleChange} />
        {error.password && <div className="error">{error.password}</div>}
      </div>

      <div className="field">
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input type="text" name="confirmpassword" id="confirmpassword" placeholder="re-enter the password" value={formData.confirmpassword} onChange={handleChange} />
        {error.confirmpassword && <div className="error">{error.confirmpassword}</div>}
      </div>

      <div className="field">
        <label htmlFor="contact">Contact</label>
        <input type="text" name="contact" id="contact" placeholder="enter your Number" value={formData.contact} onChange={handleChange} />
        {error.contact && <div className="error">{error.contact}</div>}
      </div>

      <div className="field">
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" name="dob" id="dob" placeholder="" value={formData.dob} onChange={handleChange} />
        {error.dob && <div className="error">{error.dob}</div>}
      </div>

      <div className="field">
        <label htmlFor="gender">Gender</label>
        <select name="gender" id="gender" value={formData.gender} onChange={handleChange}>
          <option value="select">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {error.gender && <div className="error">{error.gender}</div>}
      </div>

      <button>Submit</button>

    </form>
  </div>
}

