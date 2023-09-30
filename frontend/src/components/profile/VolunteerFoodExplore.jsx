import { React, useState, useEffect, Fragment } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import DataService from 'services/auth/user.service'
import AuthService from 'services/auth/auth.service'
import Alert from 'react-bootstrap/Alert';
//https://mui.com/material-ui/react-list/
import { CDropdown, CDropdownToggle, CTableFoot, CDropdownMenu, CDropdownItem, CButton, CDropdownDivider, CHeader, CHeaderBrand, CHeaderToggler, CHeaderNav, CNavItem, CNavLink, CContainer, CCollapse, CForm, CFormInput, CFormButton } from '@coreui/react';
import { Row } from 'react-bootstrap';

const VolunteerFoodExplore = () => {
    const [checked, setChecked] = useState([])
    const [items, setItems] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [response, setResponse] = useState('')
    const [show, setShow] = useState(true);

    let currentUser = AuthService.getCurrentUser()

    useEffect(() => {
        DataService.getAllBusinessItemsForRequest()
            .then((response) => {
                var arr = response.filter((obj) => {
                    return obj.food_listing != null
                })
                setItems(arr)
            })
    }, [])

    const getDate = (date) => {
        const toDate = new Date(date)
        return new Date(
            toDate.getFullYear(),
            toDate.getMonth(),
            toDate.getDate()
        ).toLocaleString().split(',')[0];
    }

    const handleToggle = (e) => {
        var updatedList = [...checked];
        if (e.target.checked) {
            updatedList = [...checked, e.target.value];
        } else {
            updatedList.splice(checked.indexOf(e.target.value), 1);
        }
        setChecked(updatedList);

        var selectedItems = items.filter((obj) => {
            return updatedList.some((f) => {
                return f === obj.id;
            });
        })
        setSelectedItems(selectedItems)
    };

    const handleTrimiteCerere = (selectedItems) => {
        DataService.inserareCerereVoluntar(selectedItems, currentUser.id).then((response) => {
            console.log(response)
            setResponse('Cererea a fost inregistrata')
        })
    }

    return (
        <>
            <div class="col-sm mt-5 pt-5 p-3 text-center">
                <h5 className='mb-3'>Exploreaza noile articole postate</h5>
                <CDropdown variant="btn-group" direction="dropend">
                    <CDropdownToggle color="secondary">Toate orasele</CDropdownToggle>
                </CDropdown>
            </div>

            {
                items.length > 0 && items.map((e, i) =>
                    <div>
                        <div class="row">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-12">
                                            <List
                                                sx={{ width: '100%', bgcolor: 'background.paper' }}
                                                key={i}
                                                className='col-sm-4'
                                                component="nav"
                                                aria-labelledby="nested-list-subheader"
                                                subheader={
                                                    <ListSubheader component="div" id="nested-list-subheader" className='pt-3 mt-3 bg-light'>
                                                        Postat de {e.food_listing.business_users.business_name}, {e.food_listing_add.strada} {e.food_listing_add.numar} {e.food_listing_add.oras}, {e.food_listing.phone}, {e.food_listing.email}
                                                    </ListSubheader>
                                                }
                                            >
                                                <ListItem key={i}
                                                    secondaryAction={
                                                        <Checkbox
                                                        key={i}
                                                            edge="end"
                                                            onChange={handleToggle}
                                                            checked={checked.includes(e.id)}
                                                            value={e.id}
                                                        />
                                                    }
                                                >
                                                    <ListItemAvatar  key={i}>
                                                        <Avatar alt="Remy Sharp" src={`http://localhost:8080/${e.image}`} />
                                                    </ListItemAvatar>
                                                    <ListItemText  key={i}
                                                        primary={e.title}
                                                        secondary={
                                                            <Fragment  key={i}>
                                                                <Typography  key={i}
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary"
                                                                >
                                                                    {e.quantity} {e.units} {e.description} | Expira la data de {getDate(e.expiringDate)}
                                                                </Typography>
                                                                {" — Adaugat la " + getDate(e.createdAt)}
                                                            </Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </List>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                )
            }

            {
                items.length == 0 && (
                    <div className='mt-5 pt-5'>
                        <Alert variant="secondary" dismissible>
                            Nu exista articole in acest moment. Reveniti  mai tarziu.
                        </Alert>
                    </div>

                )
            }

            {(
                selectedItems.length > 0 && (
                    <>
                        <p className='pt-3'>Rezumat</p>

                        <TableContainer component={Paper}>
                            <Table sx={{ maxWidth: 650 }} size="small">
                                <TableHead >
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Element</TableCell>
                                        <TableCell>Furnizor</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ maxWidth: 650 }}>
                                    {
                                        selectedItems.map((e) =>
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, maxWidth: 650 }}>
                                                <TableCell component="th" scope="row">1</TableCell>
                                                <TableCell component="th" scope="row">
                                                    {e.title}
                                                </TableCell>
                                                <TableCell>{e.food_listing.business_users.business_name}</TableCell>
                                            </TableRow>
                                        )}

                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Button size="small" variant="contained" className='m-1' endIcon={<SendIcon />} onClick={() => handleTrimiteCerere(selectedItems)}>
                            Trimite
                        </Button>

                        {response && (
                            <Alert variant="success" onClose={() => { setShow(false); setResponse("") }} dismissible>
                                <p>
                                    {response}
                                </p>
                            </Alert>
                        )}
                    </>
                )
            )}

        </>
    )
}

export default VolunteerFoodExplore