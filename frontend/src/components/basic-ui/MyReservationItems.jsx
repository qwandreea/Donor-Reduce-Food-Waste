import { React, useState, useEffect } from 'react'
import { CCard, CCardBody, CCardImage, CButton, CRow, CCol, CCardFooter, CCardHeader } from '@coreui/react';
import DataService from 'services/auth/user.service'
import AuthService from 'services/auth/auth.service'

const MyReservationItems = () => {
  const [items, setItems] = useState([]);
  let currentUser = AuthService.getCurrentUser()
  let adress = '';

  const getDiffDays = (date) => {
    const toDate = new Date(date)
    const diffInTime = toDate.getTime() - new Date().getTime()
    const diffInDays = diffInTime / (1000 * 3600 * 24)
    const absDiffInDays = Math.round(Math.abs(diffInDays))
    return absDiffInDays > 0 ? 'in ' + absDiffInDays + ' zile' : 'azi'
  }

  const handleAnulareRezervare = (id) => {
    DataService.deleteReservedItem(id);
  }

  useEffect(() => {
    DataService.getUserReservedItems(currentUser.id)
      .then((response) => setItems(response))
  }, [items])

  return (
    <>
      {(items.length == 0 && <div class="alert  mt-5 pt-5">
        <div class="card">
          <div class="card-header">
            No reservations
          </div>
          <div class="card-body">
         
            <p class="card-text">In acest moment nu aveti nicio rezervare activa. </p>
            <a href="/#menu" class="btn btn-primary">Exploreaza</a>
          </div>
        </div>

      </div>
      )}

      {(
        items.length > 0 && 
        <CRow xs={{ cols: 1, gutter: 5 }} md={{ cols: 5 }} className='pt-3 mt-3'>
        {items.map((item) => (
          <CCol xs>
            <CCard>
              <CCardHeader>{item.items_rezervate_items.title}</CCardHeader>
              <CCardImage orientation="top" src={`http://localhost:8080/${item.items_rezervate_items.image}`} className='img-fluid'  />
              <CCardBody>
                <p className='card-text mb-1'><small>Descriere: </small>{item.items_rezervate_items.description}</p>
                <p className='card-text mb-1'><small>Stare: </small>{item.items_rezervate_items.state}</p>
                <p className='card-text mb-1'> {item.items_rezervate_items.isDonating == 1 ? <small>De donat</small> : <small>Pret {item.price} </small>}</p>
                <p className='card-text mb-1'><small>Expira</small> {getDiffDays(item.items_rezervate_items.expiringDate)} </p>
                <p className='card-text mb-1'><small>Cantitate: </small>{item.items_rezervate_items.quantity} {item.items_rezervate_items.units}</p>
                <p className='card-text mb-1'><small>Ridicare de preferinta: </small> {item.items_rezervate_items.pickupInterval}</p>
                <p className='card-text mb-1'><small>Ridicare la </small>:
                  {
                    adress = item.items_rezervate_items.food_listing.adrese.filter((obj) => {
                      return obj.id == item.items_rezervate_items.adress_pickup_id
                    }).map((adresa) => {
                      return ' ' + adresa.strada + ' ' + adresa.numar + ' ' + adresa.oras
                    })} </p>
                <p className='card-text mb-1'><small>Oferit de: </small>
                  {item.items_rezervate_items.food_listing.firstName} {item.items_rezervate_items.food_listing.lastName},
                  &nbsp;{item.items_rezervate_items.food_listing.phone},
                  &nbsp;{item.items_rezervate_items.food_listing.email}
                </p>
              </CCardBody>
              <CCardFooter className='justify-content-center'>
                <CButton onClick={() => handleAnulareRezervare(item.id)}>Anuleaza</CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        ))}
      </CRow>
      )}
    
    </>
  )
}

export default MyReservationItems