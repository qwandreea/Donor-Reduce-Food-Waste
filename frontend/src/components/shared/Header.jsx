import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LanguageDropdown from 'components/basic-ui/LanguageDropdown'
import { useTranslation } from 'react-i18next'
import AuthService from 'services/auth/auth.service';

const Header = () => {

  const { t } = useTranslation();
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    console.log(user)
  }, []);

  const logout = (e) => {
    AuthService.logout()
    navigate("/");
    window.location.reload(true);
  };

  return (
    <div className="container">
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">

          <a href="/" className="logo d-flex align-items-center me-auto me-lg-0">
            <h1>Donor<span>.</span></h1>
          </a>
          <nav id="navbar" className="navbar">
            <ul>
              <li><a href="/">{t('Home')}</a></li>
              <li><a href="/#about">{t('About')}</a></li>
              <li><a href="/#menu">{t('Explore')}</a></li>
              <li><a href="/#chefs">{t('Activity')}</a></li>
              {/* <li className="dropdown"><a href="#"><span>{t('Shop')}</span> <i className="bi bi-chevron-down dropdown-indicator"></i></a>
                <ul>
                  <li><a href="#">Drop Down 1</a></li>
                  <li className="dropdown"><a href="#"><span>Menu</span> <i className="bi bi-chevron-down dropdown-indicator"></i></a>
                    <ul>
                      <li><a href="#">Deep Drop Down 1</a></li>
                      <li><a href="#">Deep Drop Down 2</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Drop Down 2</a></li>
                </ul>
              </li> */}
              <li><a href="/#footer">Contact</a></li>
            </ul>
          </nav>
          <div>
            {!currentUser ? (<div><a className="btn-book-a-table" href='/login'>{t('Login')}</a>
              <a className="btn-book-a-table" href='/signup'>{t('Signup')}</a>
              <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
              <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i></div>)
              : (<div className="btn-group">
                <button className="btn btn-secondary btn-sm" type="button">
                  {currentUser.email}
                </button>
                <button type="button" className="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false" />
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item active" href="/profile">Profile</a></li>
                  <li><button className="dropdown-item" onClick={logout} type="button">Logout</button></li>
                </ul>
              </div>)}
          </div>
          <LanguageDropdown />
        </div>
      </header></div>
  )
}

export default Header