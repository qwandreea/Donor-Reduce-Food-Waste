import React, { useState, useEffect } from "react";
import AuthService from "services/auth/auth.service";
import DataService from "services/auth/user.service";
import Header from "components/shared/Header";
import { Navigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import BusinessUserProfile from "./BusinessUserProfile";
import VolunteerUserProfile from "./VolunteerUserProfile";

function Profile() {
  const currentUser = AuthService.getCurrentUser();

  if (currentUser == null) {
    return (
      <Navigate to='/login' />
    )
  }


  return (
    <div>
      <Header />
      {(currentUser.tip == 0 && <UserProfile />)}
      {(currentUser.tip == 1 && <BusinessUserProfile/>)}
      {(currentUser.tip == 2 && <VolunteerUserProfile/>)}
    </div>

  )
}

export default Profile