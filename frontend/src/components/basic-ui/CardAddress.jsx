import { React, useEffect, useState } from 'react'
import { CCol, CCard, CCardBody, CButton, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CForm, CFormInput } from '@coreui/react';
import DataService from 'services/auth/user.service'
import AuthService from 'services/auth/auth.service';

const CardAddress = () => {
    const [addresses, setAddresses] = useState([])
    const currentUser = AuthService.getCurrentUser();
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        DataService.getUserAddresses(currentUser.id).then((data) => {
            setAddresses(data)
        })
    }, [addresses])

    const onChangeStreet = (e) => {
        let value = e.target.value;
        setStreet(value)
    }

    const onChangeNumber = (e) => {
        let value = e.target.value;
        setNumber(value)
    }

    const onChangeCity = (e) => {
        let value = e.target.value;
        setCity(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        DataService.insertAddress(currentUser.id, street, number, city)
            .then(resp => console.log(resp))
            .catch((err) => console.log(console.log(err.message)))
    }

    const handleDeleteRow = (e, k) => {
        e.preventDefault();
        const addrId = addresses[k].value;
        DataService.deleteAddress(addrId)
    }

    return (
        <>
            <CCol sm={6}>
                <CCard>
                    <CCardHeader>My addresses</CCardHeader>
                    <CCardBody>
                        {(addresses.length == 0 && <div class="alert alert-secondary" role="alert">
                            Nicio adresa salvata
                        </div>
                        )}

                        {(Array.isArray(addresses) && addresses.length > 0 &&
                            <CTable hover>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Street</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">City</CTableHeaderCell>
                                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {addresses.map((address, key) => (
                                        <CTableRow>
                                            <CTableHeaderCell scope="row">{key + 1}</CTableHeaderCell>
                                            <CTableDataCell>{address.strada}</CTableDataCell>
                                            <CTableDataCell>{address.numar}</CTableDataCell>
                                            <CTableDataCell>{address.oras}</CTableDataCell>
                                            <CTableDataCell>
                                                <button onClick={event => handleDeleteRow(event, key)} className="btn btn-sm btn-danger text-white">x</button>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        )}


                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={4}>
                                <CFormInput type="text" id="inputEmail4" label="Street" value={street} onChange={onChangeStreet} />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput type="text" id="inputPassword4" label="Number" value={number} onChange={onChangeNumber} />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput id="inputCity" label="City" value={city} onChange={onChangeCity} />
                            </CCol>
                            <CCol xs={12}>
                                <CButton type="submit">Add address</CButton>
                            </CCol>
                        </CForm>

                    </CCardBody>
                </CCard>
            </CCol>
        </>
    )
}

export default CardAddress