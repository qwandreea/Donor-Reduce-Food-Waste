import { React, useState, useEffect } from 'react'
import { CCard, CCardBody, CCardImage, CButton, CRow, CCol, CCardFooter, CCardHeader } from '@coreui/react';
import DataService from 'services/auth/user.service'
import AuthService from 'services/auth/auth.service'

const MyListedItems = () => {
  const [items, setItems] = useState([]);
  const active = 'bg-light'
  const inactive = 'bg-secondary'
  let currentUser = AuthService.getCurrentUser()

  const getDate = (date) => {
    const toDate = new Date(date)
    return new Date(
      toDate.getFullYear(),
      toDate.getMonth(),
      toDate.getDate()
    ).toDateString();
  }

  const getDiffDays = (date) => {
    const toDate = new Date(date)
    const diffInTime = toDate.getTime() - new Date().getTime()
    const diffInDays = diffInTime / (1000 * 3600 * 24)
    const absDiffInDays = Math.round(Math.abs(diffInDays))
    return absDiffInDays;
  }

  const handleActivateItem = (id, active) => {
    DataService.activateItem(id, active)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message))
  }

  useEffect(() => {
    DataService.getAllUserItems(currentUser.id)
      .then((response) => setItems(response))
  }, [items])

  return (
    <>
      <CRow xs={{ cols: 1, gutter: 5 }} md={{ cols: 5 }} className='pt-3'>
        {items.length > 0 && Array.isArray(items) && items.map((item, key) => (
          <CCol xs>
            <CCard className={item.isActive ? active : inactive}>
              <CCardHeader><strong>{item.title} #{item.id.split('-')[0]}</strong></CCardHeader>
              <CCardImage orientation="top" src={`http://localhost:8080/${item.image}`} className='img-fluid' style={{ height: 30 + '%', width: 40 + '%' }} />
              <CCardBody>
                <p className='card-text mb-1'><small>Descriere: </small>{item.description}</p>
                <p className='card-text mb-1'><small>Stare: </small>{item.state}</p>
                <p className='card-text mb-1'>
                  {(getDiffDays(item.expiringDate) > 0 &&
                    <>
                      <small>Expira la: </small>  <span>{getDate(item.expiringDate)}</span>
                    </>
                  )}

                  {(getDiffDays(item.expiringDate) <= 0 &&
                    <small style={{ color: 'red' }}>Expirat</small>
                  )}

                </p>
                <p className='card-text mb-1'><small>Cantitate: </small> {item.quantity} {item.units}</p>
                <p className='card-text mb-1'><small>Ridicare de preferinta: </small> {item.pickupInterval} </p>
                <p className='card-text mb-1'><small>Ridicare la </small>: {item.food_listing_add.strada}, {item.food_listing_add.numar}, {item.food_listing_add.oras}</p>
                <p className='card-text mb-1'>
                  {item.isDonating == 1 ? 'De donat' : 'Pret ' + item.price + ' ron'}
                </p>
                {
                  Array.isArray(item.items_rezervate_items) && item.items_rezervate_items.map((rezervare) =>
                    <>
                      <p>Rezervare id # {rezervare.id}</p>
                    <p><strong>Rezervat de </strong>{rezervare.items_rezervate_user.firstName} {rezervare.items_rezervate_user.lastName} {rezervare.items_rezervate_user.phone}, {rezervare.items_rezervate_user.email}</p>
                    </>
                  
                  )
                }
              </CCardBody>

              {(getDiffDays(item.expiringDate) > 0 &&
                <>
                  <CCardFooter className='justify-content-center'>
                    <CButton onClick={() => handleActivateItem(item.id, item.isActive)}>{item.isActive ? 'Dezactiveaza' : 'Activeaza'}</CButton>
                    <hr />
                    <small className="text-medium-emphasis">Last updated {getDate(item.updatedAt)}</small>
                  </CCardFooter>
                </>
              )}
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default MyListedItems