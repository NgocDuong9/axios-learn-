import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://api-v2.sucosun.com/api/user/login",
        { password, email }
      );
      localStorage.setItem("access_token", response.data.data.access_token);
      localStorage.setItem("refresh_token", response.data.data.refresh_token);
      console.log(response);
      navigate("/profile");
    } catch (error) {}
  };

  return (
    <div style={{ display: "flex" }}>
      <input
        type="text"
        placeholder="Tên đăng nhập"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
};

export default Login;
