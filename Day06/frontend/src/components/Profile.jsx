import axios from "axios";
import React, { useState } from "react";

const Profile = () => {
  const [profileData, setProfileData] = useState();

  const logOutFunc = () => {
    localStorage.removeItem("token");
    alert("Loged out successful");
    setProfileData("");
    return;
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8080/me", {
      headers: {
        token,
      },
    });

    setProfileData(response.data.userProfileData);
    // console.log("This is the user profile data:", profileData);
  };
  return (
    <div>
      <div>
        <button
          onClick={() => {
            getProfile();
          }}
        >
          Get profile 👤
        </button>
        <br />
        <button
          onClick={() => {
            logOutFunc();
          }}
        >
          logOut ➜
        </button>
      </div>

      {profileData ? (
        <div>
          <h2>{profileData.username}</h2>
          <h2>{profileData.email}</h2>
        </div>
      ) : (
        // console.log("Login first")
        <div>Login First to access profile</div>
      )}
    </div>
  );
};

export default Profile;
