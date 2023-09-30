import React from 'react'
import Sidebar_v2 from '../basic-ui/Sidebar'
import { CRow, CCol, CCard, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'
import CardAddress from '../basic-ui/CardAddress';
import CardUser from '../basic-ui/CardUser';
import AuthService from 'services/auth/auth.service';

const UserProfileSettings = () => {
  return (
 
      <div class="col-sm">
        <CRow>
          <CardUser />
          <CardAddress />
        </CRow>
      </div>
 

  )
}

export default UserProfileSettings