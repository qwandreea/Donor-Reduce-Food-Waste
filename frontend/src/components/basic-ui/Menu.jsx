import { React, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import Nav from 'react-bootstrap/Nav';
import DataService from 'services/auth/user.service'
import Modal from 'react-bootstrap/Modal'
import AuthService from 'services/auth/auth.service';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Alert from 'react-bootstrap/Alert';

const Menu = () => {
    const { t } = useTranslation();
    const [mainCategories, setMainCategories] = useState([])
    const [allItems, setAllItems] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(12)
    const [itemDetails, setItemDetails] = useState([]);
    const [show, setShow] = useState(false);
    const currentUser = AuthService.getCurrentUser();
    const [orase, setOrase] = useState(["Toate"])
    const [selectedCity, setSelectedCity] = useState(orase[0])
    const [titlu, setTitlu] = useState('')
    const [descriere, setDescriere] = useState('')
    const navigate = useNavigate();
    const [response, setResponse] = useState('')

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = (id) => {
        setShow(true);
        DataService.getItemDetailsById(id).then((data) => setItemDetails(data))
    }

    const onChangeTitlu = (e) => {
        const value = e.target.value;
        setTitlu(value);
    };

    const onChangeDescriere = (e) => {
        const value = e.target.value;
        setDescriere(value);
    };

    const handleSelectCity = (value) => {
        setSelectedCity(value)
        if (value != 'Toate') {
            var arrA = allItems.filter((obj) => {
                if (obj.food_listing_add == null) {
                    return obj.food_listing_category.food_listing_add == value
                } else {
                    return obj.food_listing_add.oras == value
                }
            })

            if (arrA.length > 0) {
                setAllItems(arrA)
            } else {
                setAllItems([])
            }
        }
    }

    const handleRezerva = (id) => {
        if (currentUser == null) {
            setTimeout(() => {
                navigate('/login')
            }, 1000);
        }
        DataService.reserveItem(currentUser.id, id).then((data) => console.log(data))
    }

    const getDiffDays = (date) => {
        const toDate = new Date(date)
        const diffInTime = toDate.getTime() - new Date().getTime()
        const diffInDays = diffInTime / (1000 * 3600 * 24)
        const absDiffInDays = Math.round(Math.abs(diffInDays))
        if (absDiffInDays == 1) {
            return 'ieri'
        }
        if (absDiffInDays > 0) {
            return 'acum ' + absDiffInDays + ' zile'
        }
        if (absDiffInDays == 0) {
            return 'azi'
        }
    }

    const getDate = (date) => {
        const toDate = new Date(date)
        return new Date(
            toDate.getFullYear(),
            toDate.getMonth(),
            toDate.getDate()
        ).toDateString();
    }

    const handleReview = (e) => {
        e.preventDefault()
        const title = e.target.title.value;
        const descriere = e.target.descriere.value;
        const id = e.target.id.value
        DataService.adaugaRecenzie(titlu, descriere, id).then((data) => setResponse(data))
    }

    useEffect(() => {
        DataService.getMainCategories().then((data) => setMainCategories(data));
        DataService.getAllActiveItems(selectedCategory).then((data) => setAllItems(data));
        DataService.getAllOrase().then((data) => setOrase(data))
        console.log(allItems)
    }, [selectedCategory, selectedCity, show]);

    return (
        <>
            <section id="menu" className="menu">
                <div className="container" data-aos="fade-up">
                    <div className="section-header">
                        <h2>{t('Available Menu')}</h2>
                        <p>{t('Check')} <span>{t('Yummy Menu')}</span></p>
                    </div>


                    <ul className="nav nav-tabs d-flex justify-content-center" data-aos="fade-up" data-aos-delay="200">
                        {
                            Array.isArray(mainCategories) && mainCategories.map((category, index) => (
                                <Nav.Item key={index}>
                                    <Nav.Link
                                        onClick={() => setSelectedCategory(category.id)}
                                        eventKey={index}
                                        className={index == 0 ? "nav-link show active" : "nav-link"}
                                        data-bs-toggle="tab"
                                        data-bs-target={'#menu-' + category.id}>
                                        {category.label}
                                    </Nav.Link>
                                </Nav.Item>
                            ))
                        }
                    </ul>

                    <div className="tab-content" data-aos="fade-up" data-aos-delay="300">


                        <div className="tab-content" data-aos="fade-up" data-aos-delay="300">
                            {
                                mainCategories.map((category, index) => (
                                    <div className={index == 0 ? "tab-pane fade show active" : "tab-pane fade"} id={'menu-' + category.id}>
                                        <div className="tab-header text-center">
                                            <p>{t('Menu')}</p>
                                            <h3>{category.label}</h3>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                    {selectedCity}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {
                                                        orase.map((value) =>
                                                            <Dropdown.Item onClick={() => handleSelectCity(value)}>{value}</Dropdown.Item>
                                                        )
                                                    }

                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className="row gy-5">
                                            {
                                                Array.isArray(allItems) && allItems.map((item, indexItem) =>
                                                    <div className="col-lg-4 menu-item">
                                                        <a className="glightbox">
                                                            <img src={`http://localhost:8080/${item.image || item.food_listing_category.image}`} style={{ width: 400 + 'px', height: 200 + 'px' }} className="menu-img img-fluid " alt="" />
                                                        </a>
                                                        <h4>{item.title}</h4>
                                                        <p className="ingredients">
                                                            {item.quantity || item.food_listing_category.quantity} {item.units || item.food_listing_category.units}
                                                        </p>
                                                        <p className="ingredients">
                                                            Descriere: {item.description || item.food_listing_category.description}
                                                        </p>
                                                        <p className="ingredients">
                                                            Expira la: {getDate(item.expiringDate || item.food_listing_category.expiringDate)}
                                                        </p>
                                                        <p className="ingredients">
                                                            Adăugat {getDiffDays(item.createdAt || item.food_listing_category.createdAt)}
                                                        </p>
                                                        <p className="price">
                                                            {(item.price || item.food_listing_category.price) != 0
                                                                ? 'RON ' + (item.price || item.food_listing_category.price) : 'Gratuit'}
                                                        </p>
                                                        {(
                                                            item.food_listing != undefined && (
                                                                <p>
                                                                    <button className='btn' onClick={() => handleShow(item.id || item.food_listing_category.id)} >
                                                                        <span style={{ color: 'red' }}>Postat de {item.firstName || item.food_listing.firstName} {item.food_listing.user_reviews.length} recenzii</span>
                                                                    </button>
                                                                </p>
                                                            )
                                                        )}


                                                        <button key={indexItem} onClick={() => handleRezerva(item.id || item.food_listing_category.id)} className='btn btn-light me-3'>Rezerva</button>
                                                        <button onClick={() => handleShow(item.id || item.food_listing_category.id)} className='btn btn-light'>Detalii</button>

                                                        <Modal show={show} onHide={handleClose} class="modal modal-content modal-dialog">
                                                            {itemDetails.map((item2) =>
                                                                <>
                                                                    <Modal.Header closeButton className='modal-header bg-light'>
                                                                        <Modal.Title className='modal-title'>Postat de {item2.food_listing.firstName} {item2.food_listing.lastName}</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body className='modal-body'>
                                                                        <p><strong>Contact:</strong> {item2.food_listing.email}, {item2.food_listing.phone}</p>
                                                                        <p><strong>Ridicare la adresa:</strong> {item2.food_listing_add.strada}  {item2.food_listing_add.numar} {item2.food_listing_add.oras}</p>
                                                                        { item.food_listing.user_reviews.length > 0  &&
                                                                            <>
                                                                                <hr />
                                                                                <p><strong>Recenzii</strong></p>
                                                                                {item.food_listing && item.food_listing.user_reviews.map((recenzie, index) =>
                                                                             
                                                                                     <p>#{index + 1} [{recenzie.titlu}], {recenzie.descriere}</p>
                                                                                )}
                                                                            </>
                                                                        }

                                                                        <Form className="px-4 py-3 bg-light" onSubmit={handleReview}>
                                                                            <div >
                                                                                <label htmlFor="emailLogin1" className="form-label">Titlu</label>
                                                                                <Input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="emailLogin1"
                                                                                    name="title"
                                                                                    value={titlu}
                                                                                    onChange={onChangeTitlu}
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <label htmlFor="emailLogin2" className="form-label">Descriere</label>
                                                                                <Input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="emailLogin2"
                                                                                    name="descriere"
                                                                                    value={descriere}
                                                                                    onChange={onChangeDescriere}

                                                                                />
                                                                                <Input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="emailLogin2"
                                                                                    name="id"
                                                                                    hidden="true"
                                                                                    value={item.food_listing.userid}

                                                                                /></div>
                                                                            <div className='text-center'>
                                                                                <button className="btn btn-primary btn-block mt-3" >
                                                                                    Adauga recenzie
                                                                                </button>
                                                                            </div>
                                                                        </Form>
                                                                        {response && (
                                                                            <Alert variant="success" dismissible>
                                                                                <p>
                                                                                    {response}
                                                                                </p>
                                                                            </Alert>
                                                                        )}
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <button class="btn btn-primary" variant="secondary" onClick={handleClose}>
                                                                            Close
                                                                        </button>
                                                                    </Modal.Footer>
                                                                </>
                                                            )}
                                                        </Modal>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Menu