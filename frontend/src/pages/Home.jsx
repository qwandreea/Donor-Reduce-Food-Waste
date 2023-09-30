import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup';
import Menu from '../components/basic-ui/Menu';
import { useTranslation } from 'react-i18next';
import UserService from '../services/auth/user.service';

import heroImg from '../assets/img/hero-img.png'
import aboutImage from '../assets/img/about.jpg'
import aboutImage2 from '../assets/img/about2.jpg'

const Home = () => {
    const { t } = useTranslation();
    const [userCount, setUserCount] = useState(0);
    const [volunteerCount, setVolunteerCount] = useState(0);
    const [reservedItemsCount, setreservedItemsCount] = useState(0);
    const [activeMenus, setActiveMenus] = useState(0);

    useEffect(() => {
         UserService.userCount().then((data) => {
            setUserCount(data.value);
        })
        UserService.volunteerCount().then((data) => {
            setVolunteerCount(data.value);
        })
        UserService.getAllActiveItems().then((data)=>{
            setActiveMenus(data.length)
        })
        UserService.countReservedItems().then((data)=>{
            setreservedItemsCount(data.value)
        })
    }, []);

    return (
        <div>
            <section id="hero" className="hero d-flex align-items-center section-bg">
                <div className="container">
                    <div className="row justify-content-between gy-5">
                        <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
                            <h2 data-aos="fade-up">{t('Donate the food')} </h2>
                            <h2 data-aos="fade-up">{t('You do not longer need')}</h2>
                            <p data-aos="fade-up" data-aos-delay="100">{t('Stop Food Waste. Donor have two crucial outcomes – both prevent food waste and feed those who need the food the most.')}</p>
                            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                                <a href="#menu" className="btn-book-a-table">{t('Explore')}</a>
                                <a href="http://www.ansvsa.ro/informatii-pentru-public/risipa-alimentara/" className="glightbox btn-watch-video d-flex align-items-center"><i className="bi bi-play-circle"></i><span>{t('Reduce food waste')}</span></a>
                            </div>
                        </div>
                        <div className="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
                            <img src={heroImg} className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="300" style={{width: 400 + 'px', height:400 + 'px'}} />
                        </div>
                    </div>
                </div>
            </section>

            <main id="chefs">
                <section id="stats-counter" className="stats-counter">
                    <div className="container" data-aos="zoom-out">

                        <div className="row gy-4">

                            <div className="col-lg-3 col-md-6">
                                <div className="stats-item text-center w-100 h-100">
                                    <CountUp start={0} end={userCount} duration={2} />
                                    <p>{t('Users')}</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="stats-item text-center w-100 h-100">
                                    <CountUp start={0} end={volunteerCount} duration={2} />
                                    <p>{t('Volunteers')}</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="stats-item text-center w-100 h-100">
                                    <CountUp start={0} end={activeMenus} duration={2} />
                                    <p>{t('Menus')}</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="stats-item text-center w-100 h-100">
                                    <CountUp start={0} end={reservedItemsCount} duration={2} />
                                    <p>{t('Pick-up orders')}</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                <section id="about" className="about">
                    <div className="container" data-aos="fade-up">

                        <div className="section-header">
                            <h2>{t('About Donor')}</h2>
                            <p>{t('Learn More')} <span>{t('About Us')}</span></p>
                        </div>

                        <div className="row gy-4">
                            <div className="col-lg-7 about-img" style={{ backgroundImage: `url(${aboutImage})` }} data-aos="fade-up" data-aos-delay="150">
                                <button className="button">{t('For Donors')}</button>
                                <button className="button">{t('For Volunteers')}</button>
                            </div>

                            <div className="col-lg-5 d-flex align-items-end" data-aos="fade-up" data-aos-delay="300">
                                <div className="content ps-0 ps-lg-5">
                                    <p className="fst-italic">
                                        {t('Selling or donating surplus food just go easy with Donor. From produce stores to pizzerias, supermarkets to sushi restaurants - Donor\'ll make sure your food gets eaten, not wasted')}
                                    </p>
                                    <ul>
                                        <li><i className="bi bi-check2-all"></i>{t('Help the planet')}</li>
                                        <li><i className="bi bi-check2-all"></i>{t('Turn losses into income')}</li>
                                        <li><i className="bi bi-check2-all"></i>{t('An easy way to reach new customers')}</li>
                                        <li><i className="bi bi-check2-all"></i>{t('Showcase your food')}</li>
                                    </ul>
                                    <p>
                                        {t('It’s time to share more, care more, and waste less.')}
                                    </p>

                                    <div className="position-relative mt-4">
                                        <img src={aboutImage2} className="img-fluid" alt="" />
                                        <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox play-btn"></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                <Menu></Menu>
            </main>
        </div>
    )
}

export default Home