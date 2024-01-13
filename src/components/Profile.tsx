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
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    navigate("/");
  }

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await axios.post(
        "https://api-v2.sucosun.com/api/user/refresh-token",
        { refreshToken }
      );

      const newAccessToken = response.data.data;
      localStorage.setItem("access_token", newAccessToken);
      console.log(newAccessToken, "newAccessToken");

      return;
    } catch (error) {
      navigate("/");
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) {
        navigate("/");
        return;
      }

      await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      try {
        const response = await axios.get(
          "https://api-v2.sucosun.com/api/user/profile"
        );
        setProfile(response.data.data);
      } catch (error) {
        navigate("/");
      }
    };

    fetchData();
  }, [accessToken, navigate, refreshToken]);

  return (
    <div>
      <h2>Profile</h2>
      {profile && (
        <>
          <h3>Tên: {profile.username}</h3>
          <h3>SDT: {profile.phone}</h3>
        </>
      )}
    </div>
  );
};

export default Profile;
