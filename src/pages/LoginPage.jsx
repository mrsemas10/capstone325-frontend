import axios from "axios";
import { backendUrl } from "../utils";

const LoginPage = ({  }) => {
 
};

const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    if (email === "")
      return setError((prev) => {
        return { ...prev, emailError: "Email required" };
      });
    if (password === "")
      return setError((prev) => {
        return { ...prev, passwordError: "Password required" };
      });

    };

export default LoginPage;
