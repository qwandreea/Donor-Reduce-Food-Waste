import React, { useState, useRef, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import Form from "react-validation/build/form";
import "react-datepicker/dist/react-datepicker.css";
import heroImg from '../../assets/img/menu/food_card.jpg'
import Input from "react-validation/build/input";
import DatePicker from "react-datepicker";
import DataService from '../../services/auth/user.service'
import AuthService from "services/auth/auth.service";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import SelectMulti from 'react-select';
import Alert from 'react-bootstrap/Alert';

const currentUser = AuthService.getCurrentUser();
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required
            </div>
        );
    }
};

const isValidFileUploaded = (file) => {
    const validExtensions = ['png', 'jpeg', 'jpg']
    const fileExtension = file.split('.').pop();
    if (!validExtensions.includes(fileExtension)) {
        return (
            <div className="alert alert-danger" role="alert">
                Please provide an image
            </div>)
    }
}

const FoodListingForm = () => {
    let options = ["Crud","Preparat la aburi","Preparat la gratar", "Stir-frying", "Fiert", "Prajit"];
    let unitOptions = ["pcs", "kg", "g", "teaspoons", "cup"];
    let multiSelectOptions = [];
    let addressOptions = [];

    const form = useRef();
    const checkBtn = useRef();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState({ preview: '', data: '' });
    const [state, setState] = useState(options[0]);
    const [quantity, setQuantity] = useState("");
    const [units, setUnits] = useState(unitOptions[0]);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState([]);
    const [expiringDate, setExpiringDate] = useState(new Date());
    const [coordinates, setCoordinates] = useState({ latitue: '', longitude: '' });
    const [selectedAdress, setAddress] = useState([addressOptions[0]]);
    const [isAccepted, setIsAccepted] = useState(false);
    const [isDonating, setIsDonating] = useState(true);
    const [pickupInterval, setInterval] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [show, setShow] = useState(true);

    const [productImage, setProductImage] = useState('')

    const options2 = [
        {
            label: "Group 1",
            options: [
                { label: "Group 1, option 1", value: "value_1" },
                { label: "Group 1, option 2", value: "value_2" }
            ]
        },
        { label: "A root option", value: "value_3" },
        { label: "Another root option", value: "value_4" }
    ];

    useEffect(() => {
        DataService.getCategories().then(data => data.forEach(element => {
            multiSelectOptions.push(element);
        }))

        DataService.getUserAddresses(currentUser.id).then(data => {
            addressOptions.push(...data)
        })
    });

    useEffect(() => {
        getGeoPosition();
    }, []);

    const getGeoPosition = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        });
    }

    const onChangeTitle = (e) => {
        const value = e.target.value;
        setTitle(value);
    };

    const onChangeDescription = (e) => {
        const value = e.target.value;
        setDescription(value);
    };

    const onChangeImage = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }

    const onChangeState = (e) => {
        const value = e.target.value;
        setState(value);
    };

    const onChangeQuantity = (e) => {
        const value = e.target.value;
        setQuantity(value);
    };

    const onChangeUnits = (e) => {
        const value = e.target.value;
        setUnits(value);
    };

    const onChangePrice = (e) => {
        const value = e.target.value;
        setPrice(value)
    }

    const onCategoryChange = (e) => {
        setCategory(Array.isArray(e) ? e.map(x => (x.value)) : []);
    }

    const onChangeExpiringDate = (e) => {
        const value = e;
        setExpiringDate(value)
    }

    const onChangeAddress = (e) => {
        const value = e;
        setAddress(value)
    }

    const onChangeAccepted = (e) => {
        const value = e.target.checked;
        setIsAccepted(value)
    }


    const onChangeDonating = (e) => {
        const value = e.target.checked;
        setIsDonating(value)
    }

    const onChangeInterval = (e) => {
        const value = e.target.value;
        setInterval(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        const imgPreview = image.preview;
        const user = currentUser.id
        const lat = coordinates.latitude
        const long = coordinates.longitude


        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            setLoading(false);
            setMessage("");
            DataService.postFoodListing(user, title, description, state, productImage, quantity, units, category, expiringDate, pickupInterval, selectedAdress, price, isDonating, lat, long)
                .then((res) => setResponseMessage(res))
                .catch((err) => console.log(err.message))
        } else {
            setLoading(false);
        }
    }

    return (
        <section id="food-listing">
            <div class="card border-0 mb-3" style={{ width: 'auto', height: 100 + '%' }}>
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src={heroImg} class="img-fluid rounded-start" alt="Food Image" />
                    </div>
                    <div class="col-md-8">
                        <div class="card-header">
                            <h5>Hello, {currentUser.firstName}. List an item?</h5>
                            {responseMessage && (
                                <Alert variant="success" onClose={() => { setShow(false); setResponseMessage("") }} dismissible>
                                    <p>
                                        {responseMessage}
                                    </p>
                                </Alert>
                            )}

                        </div>

                        <div class="card-body">
                            <Form onSubmit={handleSubmit} ref={form} encType='multipart/form-data' method='POST'>
                                {/* <Input type="file" name="image" onChange={(e) => setProductImage(e.target.files[0])}/> */}
                                <Row className="mb-3">
                                    <Col>
                                        <label for="title">Titlu</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            name="title"
                                            value={title}
                                            onChange={onChangeTitle}
                                            validations={[required]}
                                        />
                                    </Col>

                                    <hr style={{ borderStyle: 'none' }} />

                                    <Col sm="20" class="form-floating">
                                        <div class="form-floating">
                                            <Input
                                                as="textarea"
                                                placeholder="Description"
                                                id="floatingTextarea2"
                                                class="form-control"
                                                style={{ height: '100px' }}
                                                value={description}
                                                onChange={onChangeDescription}
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col className="form-group">
                                        <label>Stare</label>
                                        <Select class="form-select" defaultValue="Choose..." value={state} onChange={onChangeState}>
                                            {options.map((value) => (
                                                <option value={value} key={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col className="mb-3 form-group">
                                        <label>Incarca imagine</label>
                                        <Input type="file"
                                            class="form-control"
                                            name="image"
                                            onChange={(e) => setProductImage(e.target.files[0])}
                                            validations={[isValidFileUploaded]}
                                        />
                                    </Col>
                                    <Col className="col-md-2">
                                        <label>Cantitate</label>
                                        <Input
                                            type="number"
                                            className="form-control"
                                            min="1" max="5000" value={quantity} onChange={onChangeQuantity}
                                        />
                                    </Col>
                                    <Col className="col-md-2 form-group">
                                        <label>Unitate masura</label>
                                        <Select className="form-select" defaultValue="Choose..." value={units} onChange={onChangeUnits}>
                                            {unitOptions.map((value) => (
                                                <option value={value} key={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </Select>
                                    </Col>
                                </Row>
                                <Row>
                                    {(!isDonating &&
                                        <Col className="form-group col-md-4">
                                            <div class="input-group input-group-sm mt-4">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">ron</span>
                                                </div>
                                                <Input type="text" placeholder="Enter price" className="form-control" value={price} onChange={onChangePrice} />
                                            </div>
                                        </Col>)}
                                    <Col>
                                        <label>Categorie</label>
                                        <SelectMulti
                                            className="dropdown"
                                            placeholder="Select Option"
                                            defaultValue={multiSelectOptions.filter(obj => category.includes(obj.value))}
                                            options={multiSelectOptions}
                                            onChange={onCategoryChange}
                                            isMulti
                                            isClearable
                                        />
                                    </Col>
                                </Row>

                                <Row className="mt-4">
                                    <Col className="col-md-3">
                                        <label>Data expirare</label>
                                        <DatePicker className="date form-control" selected={expiringDate} onChange={onChangeExpiringDate} dateFormat="dd/MM/yyyy" minDate={new Date().setDate(new Date().getDate() + 1)} />
                                    </Col>
                                    <Col className="col-md-4">
                                        <label>Interval de preluare preferat</label>
                                        <Input type="text" className="form-control" placeholder="Enter preffered pick-up time" value={pickupInterval} onChange={onChangeInterval} validations={[required]} />
                                    </Col>
                                    <Col className="col-md-4">
                                        <label>Pickup Location</label>
                                        <SelectMulti
                                            options={addressOptions}
                                            value={selectedAdress}
                                            onChange={onChangeAddress}
                                            getOptionLabel={(option) => option.strada + ", " + option.numar + ", " + option.oras}
                                            getOptionValue={(option) => option.value}
                                            noOptionsMessage={() => 'Adaugati o adresa din setari'}
                                        />
                                    </Col>
                                </Row>

                                <Col className="mb-3 mt-3 input-group">
                                    <Input type="checkbox" className="form-check-input" name="donate" checked={isDonating} onChange={onChangeDonating} />
                                    <label for="donate" className="ms-1">Donate</label>
                                </Col>
                                <Col className="mb-3 input-group">
                                    <Input type="checkbox" className="form-check-input" name="assure" checked={isAccepted} onChange={onChangeAccepted} />
                                    <label for="assure" className="ms-1">I assure that quality and hygiene has maintained</label>
                                </Col>
                                <div className="mb-3">
                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block" disabled={loading || !isAccepted}>
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>Submit</span>
                                        </button>
                                    </div>

                                    {message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}


                                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}



export default FoodListingForm