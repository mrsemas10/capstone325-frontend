import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../utils";

const RegisterPage = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    emailError: null,
    passwordError: null,
    confirmpasswordError: null,
  });

  const navigate = useNavigate();
  
  //   HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page reload
    if (email === "")
      //set error if fields are empty, prevent submiting empty fields
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
        alert("Email already exists");
      })
      .finally(() => setLoading(false));
  };

  // RESET INPUT FIELD ERROR ON VALUE ONCHANGE
  useEffect(() => {
    setError((prev) => {
      return { ...prev, emailError: null };
    });
  }, [email]);

  useEffect(() => {
    setError((prev) => {
      return { ...prev, passwordError: null };
    });
  }, [password]);

  useEffect(() => {
    setError((prev) => {
      return { ...prev, confirmpasswordError: null };
    });
  }, [confirmpassword]);

  if (user) return navigate("/search");
  return (
    <section className="section-center">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="form-heading">Register</h1>
          <div className="field-con">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.emailError && (
              <p className="field-error-msg">{error.emailError}</p>
            )}
          </div>
          <div className="field-con">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.passwordError && (
              <p className="field-error-msg">{error.passwordError}</p>
            )}
          </div>
          <div className="field-con">
            <label htmlFor="email">Confirm password</label>
            <input
              type="password"
              id="password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error.confirmpasswordError && (
              <p className="field-error-msg">{error.confirmpasswordError}</p>
            )}
          </div>
          <div>
            <button type="submit" className="primary-btn">
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
          <p className="form-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
