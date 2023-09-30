import React from 'react'
import AuthService from 'services/auth/auth.service';
import UserProfileSettings from '../profile/UserProfileSettings';
import BusinessUserProfileSettings from '../profile/BusinessUserProfileSettings';
import Header from 'components/shared/Header';
import VolunteerProfileSettings from '../profile/VolunteerProfileSettings';

const ProfileSettings = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="mt-5 pt-5">
      <Header />
      {(currentUser.tip == 0 && <UserProfileSettings />)}
      {(currentUser.tip == 1 && <BusinessUserProfileSettings />)}
      {(currentUser.tip == 2 && <VolunteerProfileSettings />)}
    </div>

  )
}

export default ProfileSettings