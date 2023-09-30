import { React, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import {
    MDBAccordion, MDBAccordionItem,
} from 'mdb-react-ui-kit';
import DataService from 'services/auth/user.service'
import AuthService from 'services/auth/auth.service'

const VolunteerRequests = () => {
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

    const handleAproba = (idCerere, isApproved) => {
        const status = isApproved == true ? 'Aprobat' : 'Respins';
        DataService.approveCerere(idCerere, status)
    }

    useEffect(() => {
        DataService.getCereriBusinessUser(currentUser.id)
            .then((response) => {
                setItems(response)
            })
    })

    return (
        <div class="col-sm mt-5 pt-5">
            {/* alwaysOpen */}
            <MDBAccordion  initialActive={0}>
                {items.map((data, index) =>
                    data.business_users.cereri_produse_business.map((cerereData, indexCerere) =>
                        <MDBAccordionItem collapseId={indexCerere}
                            headerTitle={`[ ${cerereData.status_cerere} ] Cerere #${cerereData.id.split('-')[0]} pentru ${data.business_users.business_name}, 
                        ${cerereData.items_cereri_produse.food_listing_add.strada}
                        ${cerereData.items_cereri_produse.food_listing_add.numar} ${cerereData.items_cereri_produse.food_listing_add.oras}  
                        ${data.email}, ${data.phone}`}>
                            <CardGroup>
                                <Card>
                                    <Card.Img variant="top" src={`http://localhost:8080/${cerereData.items_cereri_produse.image}`} style={{ maxWidth: 200 + 'px', maxHeight: 220 + 'px' }} />
                                    <Card.Body>
                                        <Card.Title>{cerereData.items_cereri_produse.title} #{cerereData.items_cereri_produse.id.split('-')[0]}</Card.Title>
                                        <Card.Text>
                                            <p className='mb-0'>{cerereData.items_cereri_produse.description},
                                                {cerereData.items_cereri_produse.quantity} {cerereData.items_cereri_produse.units}, expira la {getDate(cerereData.items_cereri_produse.expiringDate)}</p>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Creat la {getDate(cerereData.createdAt)}
                                            &nbsp; de organizatia <strong>{cerereData.cereri_produse_volunteer.represented_organisation}</strong>,
                                            Contact
                                            &nbsp; {cerereData.cereri_produse_volunteer.volunteer_users.phone}
                                            &nbsp; {cerereData.cereri_produse_volunteer.volunteer_users.email}
                                        </small>
                                        {(
                                            cerereData.status_cerere != 'In progres' &&
                                            <div>
                                                <small>{cerereData.status_cerere} la {getDate(cerereData.updatedAt)}</small>
                                            </div>
                                        )}
                                    </Card.Footer>
                                </Card>
                            </CardGroup>
                            {(
                                cerereData.status_cerere == 'In progres' &&
                                <>
                                    <Button onClick={() => handleAproba(cerereData.id, true)} variant="contained" color="success">
                                        Aproba
                                    </Button>
                                    <Button onClick={() => handleAproba(cerereData.id, false)} variant="contained" color="error">
                                        Respinge
                                    </Button>
                                </>
                            )}
                        </MDBAccordionItem>
                    )
                )}
            </MDBAccordion>
        </div>
    )
}

export default VolunteerRequests