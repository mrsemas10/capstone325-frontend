import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../utils";


  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (email === "")
      return setError((prev) => {
        return { ...prev, emailError: "Email required" };
      });
    if (password === "")
      return setError((prev) => {
        return { ...prev, passwordError: "Password required" };
      });
    if (confirmpassword === "")
      return setError((prev) => {
        return { ...prev, confirmpasswordError: "Password don't match" };
      });
    if (confirmpassword !== password)
      return setError((prev) => {
        return { ...prev, confirmpasswordError: "Password don't match" };
      });
    setLoading(true);

    await axios
      .post(backendUrl + "/auth/register", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Account created successfully");
          return navigate("/login");
        }
      })
      .catch((error) => {
        alert("Email already exists registering");
      })
      .finally(() => setLoading(false));
  };

 

export default RegisterPage;
