import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../utils";

const LoginPage = ({ handleLogin, user }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    emailError: null,
    passwordError: null,
  });

  const navigate = useNavigate();

  //   HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page reload
    setLoading(true);
    //set error if fields are empty, prevent submitting empty fields
    if (email === "")
      return setError((prev) => {
        return { ...prev, emailError: "Email required" };
      });
    if (password === "")
      return setError((prev) => {
        return { ...prev, passwordError: "Password required" };
      });

    await axios
      .post(backendUrl + "/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Login successfully");
          handleLogin(res.data.user.email);
          return navigate("/");
        }
      })
      .catch((error) => {
        alert("Invalid login credentials");
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
  
  //REDIRECT TO SEARCH PAGE IF USER IS LOGGED IN
  useEffect(() => {
    if (!user) navigate("/login");
  }, []);
  return (
    <section className="section-center">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="form-heading">Login</h1>
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
          <div>
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
          <p className="form-text">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
