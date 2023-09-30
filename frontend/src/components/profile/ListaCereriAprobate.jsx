import { React, useState, useEffect } from 'react'
import { CCardImage, CButton, CRow, CCol, CCardFooter, CCardHeader, CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody, CCardGroup, CCard, CCardBody, CHeader, } from '@coreui/react';
import DataService from 'services/auth/user.service'
import AuthService from 'services/auth/auth.service'

const ListaCereriAprobate = () => {
  let currentUser = AuthService.getCurrentUser()
  const [items, setItems] = useState([]);

  const getDate = (date) => {
    const toDate = new Date(date)
    return new Date(
      toDate.getFullYear(),
      toDate.getMonth(),
      toDate.getDate()
    ).toLocaleString().split(',')[0];
  }

  const getDiffDays = (date) => {
    const toDate = new Date(date)
    const diffInTime = toDate.getTime() - new Date().getTime()
    const diffInDays = diffInTime / (1000 * 3600 * 24)
    const absDiffInDays = Math.round(Math.abs(diffInDays))
    return absDiffInDays > 0 ? ' in ' + absDiffInDays + ' zile' : ' azi'
  }

  useEffect(() => {
    DataService.approvedListedItemsBusiness(currentUser.id)
      .then((response) => {
        setItems(response.food_listing)
      })
    console.log(items)
  }, [])

  return (
    <div class="col-sm mt-5 pt-5">
      <CCardGroup>
        <CCol sm={6} className='pe-3'>
          <div class="alert alert-success" role="alert">
            Cereri Aprobate
          </div>
          <CAccordion activeItemKey={2}>
            {
              items.map((data, index) =>
                <CAccordionItem itemKey={index}>
                  {data.items_cereri_produse.map((cerere) => {
                    return (
                      cerere.status_cerere == 'Aprobat' && (
                        <>
                          <CAccordionHeader>Cerere &nbsp;<strong> #{cerere.id.split('-')[0]}
                            {cerere.timp_ridicare == null ? ' ' : ' Ridicare' + getDiffDays(cerere.timp_ridicare)}</strong>
                          </CAccordionHeader>
                          <CAccordionBody>
                            <CCard>
                              <CCardHeader>{data.title}</CCardHeader>
                              <CCardImage orientation="top" src={`http://localhost:8080/${data.image}`} className='img-fluid' style={{ maxHeight: 24 + 'rem', maxWidth: 18 + 'rem' }} />
                              <CCardBody>
                                <p className='card-text mb-1'><small>Descriere: </small>{data.description}</p>
                                <p className='card-text mb-1'><small>Stare: </small>{data.state}</p>
                                <p className='card-text mb-1'> {data.isDonating == 1 ? <small>De donat</small> : <small>Pret {data.price} </small>}</p>
                                <p className='card-text mb-1'><small>Expira</small> {getDiffDays(data.expiringDate)} </p>
                                <p className='card-text mb-1'><small>Cantitate: </small>{data.quantity} {data.units}</p>
                                <p className='card-text mb-1'><small>Ridicare de preferinta: </small> {data.pickupInterval}</p>
                              </CCardBody>
                            </CCard>
                          </CAccordionBody>
                        </>
                      )
                    );
                  })}
                </CAccordionItem>
              )
            }
          </CAccordion>
        </CCol>


        <CCol sm={6} className='ps-3'>
          <div class="alert alert-danger" role="alert">
            Cereri Respinse
          </div>
          <CAccordion activeItemKey={2}>
            {
              items.map((data, index) =>
                <CAccordionItem itemKey={index}>
                  {data.items_cereri_produse.map((cerere) => {
                    return (
                      cerere.status_cerere == 'Respins' && (
                        <>
                          <CAccordionHeader>Cerere &nbsp;<strong> #{cerere.id.split('-')[0]}
                            {cerere.timp_ridicare == null ? ' ' : ' Ridicare' + getDiffDays(cerere.timp_ridicare)}</strong>
                          </CAccordionHeader>
                          <CAccordionBody>
                            <CCard>
                              <CCardHeader>{data.title}</CCardHeader>
                              <CCardImage orientation="top" src={`http://localhost:8080/${data.image}`} className='img-fluid' style={{ maxHeight: 24 + 'rem', maxWidth: 18 + 'rem' }} />
                              <CCardBody>
                                <p className='card-text mb-1'><small>Descriere: </small>{data.description}</p>
                                <p className='card-text mb-1'><small>Stare: </small>{data.state}</p>
                                <p className='card-text mb-1'> {data.isDonating == 1 ? <small>De donat</small> : <small>Pret {data.price} </small>}</p>
                                <p className='card-text mb-1'><small>Expira</small> {getDiffDays(data.expiringDate)} </p>
                                <p className='card-text mb-1'><small>Cantitate: </small>{data.quantity} {data.units}</p>
                                <p className='card-text mb-1'><small>Ridicare de preferinta: </small> {data.pickupInterval}</p>
                              </CCardBody>
                            </CCard>
                          </CAccordionBody>
                        </>
                      )

                    );
                  })}
                </CAccordionItem>
              )
            }

          </CAccordion>
        </CCol>

      </CCardGroup>
    </div>
  )
}

export default ListaCereriAprobate