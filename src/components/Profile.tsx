import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProfileData {
  username: string;
  phone: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    navigate("/");
  }

  const refreshAccessToken = async () => {
    try {
      if (!refreshToken) {
        navigate("/");
        return;
      }
      const response = await axios.post(
        "https://api-v2.sucosun.com/api/user/refresh-token",
        { refreshToken }
      );
      const newAccessToken = response.data.data;
      localStorage.setItem("access_token", newAccessToken);
      // console.log(newAccessToken, "newAccessToken");
      return;
    } catch (error) {
      navigate("/");
      return;
    }
  };

  const getProfile = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const response = await axios.get(
        "https://api-v2.sucosun.com/api/user/profile"
      );
      setProfile(response.data.data);
      return;
    } catch (error) {
      return;
    }
  };

  const fetchData = async () => {
    const accessToken = localStorage.getItem("access_token");

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const response = await axios.get(
        "https://api-v2.sucosun.com/api/user/profile"
      );
      setProfile(response.data.data);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          await refreshAccessToken();
          const newAccessToken = localStorage.getItem("access_token");
          if (newAccessToken) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            await getProfile();
          } else {
            navigate("/");
          }
        } catch (refreshError) {
          navigate("/");
        }
      } else {
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div>
      <h2>Profile</h2>
      {profile && (
        <>
          <h3>Tên: {profile.username}</h3>
          <h3>SDT: {profile.phone}</h3>
        </>
      )}

      <button
        style={{ padding: "20px", background: "red" }}
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default Profile;
