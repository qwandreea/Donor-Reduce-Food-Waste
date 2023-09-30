import { useState, React, useEffect } from 'react'
import { CCol, CCard, CCardBody, CCardText, CCardHeader, CCardGroup, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CForm, CFormInput } from '@coreui/react';
import AuthService from 'services/auth/auth.service';
import DataService from 'services/auth/user.service';

const BusinessUserProfileSettings = () => {
  const currentUser = AuthService.getCurrentUser();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    DataService.getBusinessUserDetails(currentUser.id).then((data) => setUserDetails(data))

  });

  return (
    <div class="col-sm">
    
      {
        userDetails != null && (
          <CCardGroup>
            <CCol sm={4}>
              <CCard>
                <CCardHeader><strong>{userDetails.business_users.business_name} {userDetails.business_users.cif} Business Account</strong></CCardHeader>
                <CCardBody>
                  <CCardText> Type : {userDetails.business_users.type}</CCardText>
                  <CCardText> Phone : {userDetails.phone}</CCardText>
                  <CCardText> Email: {userDetails.email}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <div className='ps-3'/>
            <CCol sm={4}>
              <CCard>
                <CCardHeader><strong>Address</strong></CCardHeader>
                {
                  userDetails.adrese.map((element)=>
                  <CCardBody>
                  <CCardText> Strada : {element.strada}</CCardText>
                  <CCardText> Numar : {element.numar}</CCardText>
                  <CCardText> Oras: {element.oras}</CCardText>
                </CCardBody>
                  )
                }
              
              </CCard>
            </CCol>
          </CCardGroup>

        )
      }


    </div>
  )
}

export default BusinessUserProfileSettings