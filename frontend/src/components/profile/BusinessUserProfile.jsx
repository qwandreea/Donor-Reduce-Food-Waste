import FoodListingForm from 'components/basic-ui/FoodListingForm'
import Sidebar_v2 from 'components/basic-ui/Sidebar'
import React from 'react'
import BusinessUserProfileSettings from './BusinessUserProfileSettings'

const BusinessUserProfile = ({ loggedUser }) => {
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-auto">
                    <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center ">
                        <Sidebar_v2>
                           
                        </Sidebar_v2>
                    </div>
                </div>
                <div class="col-sm mt-5 pt-5">
                    <BusinessUserProfileSettings/>
                </div>
            </div>
        </div>

    )
}

export default BusinessUserProfile