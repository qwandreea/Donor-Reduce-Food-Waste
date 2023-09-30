import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import AuthService from "./services/auth/auth.service";
import { BrowserRouter as Router } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import ProfileRedirect from "./components/profile/ProfileRedirect"
import RegisterTabs from "components/authentication/RegisterTabs";
import ProfileSettings from "components/profile/ProfileSettings";
import FoodListingForm from "components/basic-ui/FoodListingForm";
import Sidebar_v2 from "components/basic-ui/Sidebar";
import MyReservationItems from "components/basic-ui/MyReservationItems";
import MyListedItems from "components/basic-ui/MyListedItems";
import UserProfileStatistics from "components/profile/UserProfileStatistics";
import VolunteerRequests from "components/profile/VolunteerRequests";
import VolunteerFoodExplore from "components/profile/VolunteerFoodExplore";
import VolunteerFoodRequests from "components/profile/VolunteerFoodRequests";
import ListaCereriAprobate from "components/profile/ListaCereriAprobate";
import MyListedItemsBusiness from "components/basic-ui/MyListedItemsBusiness";

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <RegisterTabs />
  },
  {
    path: "/profile",
    element: <ProfileRedirect />
  },
  {
    path: '/profile-settings',
    element:
      <div>
        <Header />
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-auto">
              <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center ">
                <Sidebar_v2 />
              </div>
            </div>
            <div class="col-sm p-3">
              <ProfileSettings />
            </div>
          </div>
        </div>
      </div>
  },
  {
    path: '/food-listing',
    element:
      <div className="">
        <Header />
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-auto">
              <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center ">
                <Sidebar_v2 />
              </div>
            </div>
            <div class="col-sm p-3">
              <FoodListingForm />
            </div>
          </div>
        </div>
      </div>
  },
  {
    path: '/my-items',
    element:
      <div className="">
        <Header />
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-auto">
              <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center ">
                <Sidebar_v2 />
              </div>
            </div>
            <div class="col-sm pt-5 mt-5">
              <MyListedItems />
            </div>
          </div>
        </div>
      </div>
  },
  {
    path: '/my-items-business',
    element:
      <div className="">
        <Header />
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-auto">
              <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center ">
                <Sidebar_v2 />
              </div>
            </div>
            <div class="col-sm pt-5 mt-5">
              <MyListedItemsBusiness />
            </div>
          </div>
        </div>
      </div>
  },
  {
    path: '/my-reservations',
    element:
      <div className="">
        <Header />
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-auto">
              <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center ">
                <Sidebar_v2 />
              </div>
            </div>
            <div class="col-sm p-3">
              <MyReservationItems />
            </div>
          </div>
        </div>
      </div>
  },
  {
    path: '/user-profile/statistics',
    element: 
    <div className="">
    <Header />
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-auto">
          <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center ">
            <Sidebar_v2 />
          </div>
        </div>
        <div class="col-sm p-3 ">
          <UserProfileStatistics />
        </div>
      </div>
    </div>
  </div>
  },
  {
    path: 'volunteer-requests',
    element:
      <div className="">
        <Header />
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-auto">
              <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center ">
                <Sidebar_v2 />
              </div>
            </div>
            <div class="col-sm p-3">
              <VolunteerRequests />
            </div>
          </div>
        </div>
      </div>
  },
  {
    path: '/business-items-list',
    element: <div>
      <Header />
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-auto">
            <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center ">
              <Sidebar_v2 />
            </div>
          </div>
          <div class="col-sm p-3">
            <VolunteerFoodExplore />
          </div>
        </div>
      </div>
    </div>
  },
  {
    path: '/my-volunteer-requests',
    element: 
    <div>
      <Header />
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-auto">
            <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center ">
              <Sidebar_v2 />
            </div>
          </div>
          <div class="col-sm p-3">
            <VolunteerFoodRequests />
          </div>
        </div>
      </div>
    </div>
  },
  {
    path: '/my-approved-volunteer-requests',
    element:
    <div>
      <Header />
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-auto">
            <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center ">
              <Sidebar_v2 />
            </div>
          </div>
          <div class="col-sm p-3">
            <ListaCereriAprobate />
          </div>
        </div>
      </div>
    </div>
  }
])

function App() {

  AOS.init();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;