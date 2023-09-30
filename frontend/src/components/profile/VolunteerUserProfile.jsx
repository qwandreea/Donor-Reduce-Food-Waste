import Sidebar_v2 from 'components/basic-ui/Sidebar'
import React from 'react'
import VolunteerProfileSettings from './VolunteerProfileSettings'
import VolunteerFoodExplore from './VolunteerFoodExplore'

const VolunteerUserProfile = () => {
  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-auto">
            <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center ">
              <Sidebar_v2>

              </Sidebar_v2>
            </div>
          </div>
          <div class="col-sm p-3">
            <VolunteerFoodExplore />
          </div>
      </div>
    </div>
    </div>
  )
}

export default VolunteerUserProfile