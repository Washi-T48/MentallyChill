import React, { useContext } from "react";
import { ProfileContext } from "../ProfileContext";

const ProfileDisplay = () => {
  const { profile } = useContext(ProfileContext);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1>Profile Information</h1>
      <p>UID: {profile.uid}</p>
      <p>Display Name: {profile.displayName}</p>
      <img src={profile.pictureUrl} alt="Profile" />
      <p>Status Message: {profile.statusMessage}</p>
    </div>
  );
};

export default ProfileDisplay;
