import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AuthService from 'services/auth/auth.service';
import DataService from "services/auth/user.service";
import { CBadge } from '@coreui/react'

const Sidebar_v2 = () => {
    const currentUser = AuthService.getCurrentUser();
    const height2 = (window.innerHeight) - 100 + 'px'


    useEffect(() => {
        if (currentUser.tip == 1) {
            DataService.countNewRequestsToday(currentUser.id).then((data) => {
                localStorage.setItem('n_id', data.n_id);
            })

            DataService.nrSolicitariAprobate(currentUser.id).then((data) => {
                localStorage.setItem('n_id_v', data.n_id);
            })
        }
    }, [])

    return (

        <div className='mt-5 pt-4' style={{ display: "flex", height: `${height2}` }} >
            <Sidebar>
                <Menu>
                    {currentUser.tip != 2 &&
                        <MenuItem className='active' component={<Link to="/profile-settings" />}>{currentUser.tip == 0 ? 'Setari profil' : 'Profil'}
                        </MenuItem>}
                    {currentUser.tip != 2 && <MenuItem component={<Link to="/food-listing" />}>Listare articole</MenuItem>}
                    {currentUser.tip == 2 && <MenuItem component={<Link to="/business-items-list" />}>Exploreaza</MenuItem>}
                    <SubMenu label="Activitate">
                        {currentUser.tip == 0 && <MenuItem component={<Link to="/my-items" />}> Articolele mele listate</MenuItem>}
                        {currentUser.tip == 1 && <MenuItem component={<Link to="/my-items-business" />}> Articolele mele listate</MenuItem>}
                        {currentUser.tip == 1 && <MenuItem component={<Link to="/my-approved-volunteer-requests" />}> Lista cereri aprobate</MenuItem>}
                        {currentUser.tip == 0 && <MenuItem component={<Link to="/my-reservations" />}> Rezervarile mele </MenuItem>}
                        {currentUser.tip == 2 && <MenuItem component={<Link to="/my-volunteer-requests" />}> <small>Solicitarile mele </small><CBadge color="danger" className='ms-4'>
                        
                            {localStorage.getItem('n_id_v') != 'undefined' && JSON.parse(localStorage.getItem('n_id_v'))} New</CBadge>
                            </MenuItem>}
                    </SubMenu>
                    {currentUser.tip == 0 && <MenuItem component={<Link to="/user-profile/statistics" />}>Statistici</MenuItem>}
                    {currentUser.tip == 1 && <MenuItem component={<Link to="/volunteer-requests" />}>Cereri <CBadge color="danger" className='ms-4'>
                        {localStorage.getItem('n_id') != 'undefined' && JSON.parse(localStorage.getItem('n_id'))} New</CBadge> 
                        </MenuItem>}

                </Menu>
            </Sidebar>
        </div>
    )
}

export default Sidebar_v2
