import { React, useState, useEffect } from 'react'
import {
    MDBAccordion, MDBAccordionItem
} from 'mdb-react-ui-kit';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import DataService from 'services/auth/user.service'
import AuthService from 'services/auth/auth.service'


const VolunteerFoodRequests = () => {
    const [items, setItems] = useState([])
    const currentUser = AuthService.getCurrentUser()
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        DataService.getVolunteerRequests(currentUser.id)
            .then((response) => {
                setPhone(response.phone)
                setEmail(response.email)
                setItems(response.volunteer_users)
            })
    }, [items])

    const getDiffDays = (date) => {
        const toDate = new Date(date)
        const diffInTime = toDate.getTime() - new Date().getTime()
        const diffInDays = diffInTime / (1000 * 3600 * 24)
        const absDiffInDays = Math.round(Math.abs(diffInDays))
        return absDiffInDays > 0 ? 'maine' : 'azi'
      }

      const getDate = (date) => {
        const toDate = new Date(date)
        return new Date(
            toDate.getFullYear(),
            toDate.getMonth(),
            toDate.getDate()
        ).toLocaleString().split(',')[0];
    }

    const handleRidicare = (data, id) => {
        const today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const updated = data == 'Azi' ? today : tomorrow
        DataService.setDataRidicareCerere(updated, id).then((resp) => { })
    }

    return (
        <div class="col-sm mt-5 pt-5">
            <MDBAccordion alwaysOpen initialActive={0}>
                {
                    Array.isArray(items.cereri_produse_volunteer) && items.cereri_produse_volunteer.map((e, index) =>
                        <MDBAccordionItem key={index} collapseId={index}  className='bg-light'
                            headerTitle={e.status_cerere + ' ' + e.cereri_produse_business.business_name + ', ' + phone + ', ' + email + ' ' +
                                e.items_cereri_produse.food_listing_add.strada + ', ' + e.items_cereri_produse.food_listing_add.numar + ', ' + e.items_cereri_produse.food_listing_add.oras}>
                            <h4 className='accordion-header'></h4>
                            <TableContainer>
                                <Table sx={{ maxWidth: 650 }} size="small">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Element</TableCell>
                                            <TableCell>Cantitate</TableCell>
                                            <TableCell>Furnizor</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ maxWidth: 650 }}>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, maxWidth: 650 }}>
                                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {e.items_cereri_produse.title}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {e.items_cereri_produse.quantity} {e.items_cereri_produse.units}
                                            </TableCell>
                                            <TableCell>{e.cereri_produse_business.business_name}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                {(
                                    e.status_cerere != 'In progres' && e.timp_ridicare == null && (
                                        <div class="input-group">
                                            <button type="button"
                                                onClick={() => handleRidicare('azi', e.id)} class="btn btn-primary btn-sm input-group-addon">Ridicare azi</button> &nbsp;
                                            <button type="button"
                                                onClick={() => handleRidicare('maine', e.id)} class="btn btn-primary btn-sm input-group-addon">Ridicare maine</button>
                                        </div>)
                                )}
                                {(
                                    e.timp_ridicare != null && (
                                        <h5 className='pt-4'>Ridicare {getDiffDays(e.timp_ridicare)}, la {getDate(e.timp_ridicare)}</h5>
                                    )
                                )}
                            </TableContainer>
                        </MDBAccordionItem>
                    )
                }
            </MDBAccordion>
        </div>
    )
}

export default VolunteerFoodRequests