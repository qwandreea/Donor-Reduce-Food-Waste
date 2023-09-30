import { React, useState, useEffect } from 'react'
import { CCard, CCardBody, CCardImage, CButton, CRow, CCol, CCardFooter, CCardHeader } from '@coreui/react';
import DataService from 'services/auth/user.service'
import AuthService from 'services/auth/auth.service'

const MyListedItemsBusiness = () => {
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
        ).toLocaleString().split(',')[0];
    }

    const handleActivateItem = (id, active) => {
        DataService.activateItem(id, active)
            .then((response) => console.log(response))
            .catch((err) => console.log(err.message))
    }

    useEffect(() => {
        DataService.getAllListedItemsBusiness(currentUser.id)
            .then((response) => setItems(response))
    }, [])

    return (
        <>
            <CRow xs={{ cols: 1, gutter: 5 }} md={{ cols: 5 }} className='pt-3'>
                {Array.isArray(items.food_listing) && items.food_listing.map((item, key) => (
                    <CCol xs>
                        <CCard className={item.isActive ? active : inactive}>
                            <CCardHeader><strong>{item.title} #{item.id.split('-')[0]}</strong></CCardHeader>
                            <CCardImage orientation="top" src={`http://localhost:8080/${item.image}`} className='img-fluid' style={{ maxHeight: 100 + '%', maxWidth: 100 + '%' }} />
                            <CCardBody>
                                <p className='card-text mb-1'><small>Descriere: </small>{item.description}</p>
                                <p className='card-text mb-1'><small>Stare: </small>{item.state}</p>
                                <p className='card-text mb-1'><small>Expira la: </small>  <span>{getDate(item.expiringDate)}</span> </p>
                                <p className='card-text mb-1'><small>Cantitate: </small> {item.quantity} {item.units}</p>
                                <p className='card-text mb-1'><small>Ridicare de preferinta: </small> {item.pickupInterval} </p>
                                <p className='card-text mb-1'><small>Ridicare la </small>: {item.food_listing_add.strada}, {item.food_listing_add.numar}, {item.food_listing_add.oras}</p>
                                <p className='card-text mb-1'>
                                    {item.isDonating == 1 ? 'De donat' : 'Pret ' + item.price + ' ron'}
                                </p>
                            </CCardBody>
                            <CCardFooter className='justify-content-center'>
                                {
                                    item.items_cereri_produse.length == 0 && (
                                        <>
                                            <CButton onClick={() => handleActivateItem(item.id, item.isActive)}>{item.isActive ? 'Dezactiveaza' : 'Activeaza'}</CButton>
                                            <hr />
                                        </>
                                    )
                                }
                                <small className="text-medium-emphasis">Last updated {getDate(item.updatedAt)}</small>
                                <p>
                                    {item.items_cereri_produse.map((e) =>
                                        <>
                                            <p>Vezi cererea # {e.id.split('-')[0]}</p>
                                        </>
                                    )}
                                </p>
                            </CCardFooter>
                        </CCard>
                    </CCol>
                ))}
            </CRow>
        </>
    )
}

export default MyListedItemsBusiness