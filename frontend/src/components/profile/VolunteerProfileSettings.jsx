import Sidebar_v2 from 'components/basic-ui/Sidebar'
import React from 'react'
import { CRow, CCol, CCard, CCardBody, CCardTitle, CCardText, CButton, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CForm, CFormInput, CFormSelect } from '@coreui/react';

const VolunteerProfileSettings = () => {
  return (

    <div>

      <CCard style={{ width: '18rem' }}>

        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </CCardText>
          <CButton href="#">Go somewhere</CButton>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default VolunteerProfileSettings