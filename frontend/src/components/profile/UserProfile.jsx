import FoodListingForm from 'components/basic-ui/FoodListingForm'
import Sidebar_v2 from 'components/basic-ui/Sidebar.jsx'
import UserProfileSettings from 'components/profile/UserProfileSettings'
import React from 'react'

const UserProfile = ({ loggedUser }) => {
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-auto">
                    <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center ">
                        <Sidebar_v2/>
                    </div>
                </div>
                <div class="col-sm mt-5 pt-5">
                    <UserProfileSettings/>
                </div>
            </div>
        </div>
    )
}

export default UserProfile