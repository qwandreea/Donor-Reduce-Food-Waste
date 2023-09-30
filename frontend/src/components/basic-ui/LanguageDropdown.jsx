import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const LanguageDropdown = () => {
    const [language, setLanguage] = useState('Romanian');
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const changeToRO = () => {
        setLanguage('Romanian');
        changeLanguage('ro');
    }

    const changeToEn = () => {
        setLanguage('English');
        changeLanguage('en');
    }

    return (
        <div className="dropdown">
            <button className="btn dropdown-toggle me-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {
                    language == 'English' ? <i className="sl-flag flag-usa"></i> : <i className="sl-flag flag-ro"></i>
                }
            </button>
            <ul className="dropdown-menu">
                {
                    language == 'English' ?
                        <li onClick={() => changeToRO()}><i className="sl-flag flag-ro"><div id="ro" /></i>&nbsp; Romanian</li> :
                        <li onClick={() => changeToEn()}><i className="sl-flag flag-usa"><div id="en" /></i>&nbsp; English</li>
                }
            </ul>
        </div>
    )
}

export default LanguageDropdown