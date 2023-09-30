import { React, useRef, useState } from 'react';
import Form, { form } from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import axios from "axios";
import { isEmail } from "validator";
import AuthService from "services/auth/auth.service";

const API_URL = "https://api.openapi.ro/api/companies/"
const apiKey = "fVz6rLyxZuqHzpsyWwfY1RqDvCUYx4EthXTPFHSdqjWkV3V-1A"

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email
            </div>
        );
    }
};

const RegisterBusiness = () => {
    const formBusiness = useRef();
    const checkBtn = useRef();
    const signupBtn = useRef();

    const type = "business_user";
    const options = ["Food manufactures", "Caterers", "Coffee shop", "Restaurant", "Retailer", "Pastry"];

    const [cif, setCif] = useState("");
    const [denumire, setDenumire] = useState("");
    const [contact, setContact] = useState("");
    const [adresa, setAdresa] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [selected, setSelected] = useState(options[0]);

    const onCifChanged = (e) => {
        const cif = e.target.value;

        setCif(cif);
        axios({
            url: API_URL + cif,
            method: 'get',
            headers: {
                'x-api-key': apiKey
            }
        }).then(response => {
            signupBtn.current.removeAttribute('disabled');
            setDenumire(response.data.denumire)
            setContact(response.data.telefon)
            setAdresa(response.data.adresa)
        }).catch(err => {
            setDenumire("")
            setContact("")
            setAdresa("")
            err.response.status == 404 ? setMessage("Please retype CIF") : setMessage (err.message)
            signupBtn.current.setAttribute('disabled', true);
        });
    }

    const onDenumireChanged = (e) => {
        const denumire = e.target.value;
        setDenumire(denumire);
    }

    const onContactChanged = (e) => {
        const contact = e.target.value;
        setContact(contact);
    }

    const onAdresaChanged = (e) => {
        const adresa = e.target.value;
        setAdresa(adresa)
    }

    const onEmailChanged = (e) => {
        const email = e.target.value;
        setEmail(email)
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password)
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.registerBusinessUser(type, cif, denumire, contact, adresa, email, password, selected).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }

        formBusiness.current.validateAll();
    }

    return (
        <div>
            <Form ref={formBusiness} onSubmit={handleRegister}>
                {!successful && (
                    <div>
                        <div class="row mt-3">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="cifRegister">CIF</label>
                                    <Input
                                        type="text"
                                        className="form-control form-control-lg"
                                        value={cif}
                                        id="cifRegister"
                                        name="cifRegister"
                                        onChange={onCifChanged}
                                        validations={[required]}
                                    />
                                </div>
                            </div>

                            <div class="col-6">
                                <label for="typeBusiness" class="form-label select-label">Tip Business</label>
                                <Select name="typeBusiness" className="form-select form-select-md mb-3" value={selected}
                                    onChange={e => setSelected(e.target.value)}>
                                    {options.map((value) => (
                                        <option value={value} key={value}>
                                            {value}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        <div class="row">

                            <div class="col-md-6 mb-4 d-flex align-items-center">
                                <div class="form-outline w-100">
                                    <label for="denumireRegister" class="form-label">Denumire Business</label>
                                    <Input
                                        type="text"
                                        disabled={true}
                                        className="form-control form-control-lg"
                                        value={denumire}
                                        id="denumireRegister"
                                        name="denumireRegister"
                                        onChange={onDenumireChanged}
                                    />
                                </div>
                            </div>

                            <div class="col-md-6 mb-4 d-flex align-items-center">
                                <div class="form-outline w-100">
                                    <label class="form-label" for="contactRegister">Numar contact</label>
                                    <Input
                                        type="text"
                                        className="form-control form-control-lg"
                                        value={contact}
                                        id="contactRegister"
                                        disabled={true}
                                        name="contactRegister"
                                        onChange={onContactChanged}
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md mb-4 pb-2">
                                <div class="form-outline">
                                    <label class="form-label" for="addressRegister">Adresa</label>
                                    <Input
                                        type="text"
                                        className="form-control form-control-lg"
                                        value={adresa}
                                        id="addressRegister"
                                        disabled={true}
                                        name="addressRegister"
                                        onChange={onAdresaChanged}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div class="col-md-6 mb-4 d-flex align-items-center">
                                <div class="form-outline w-100">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        placeholder="email@example.com"
                                        onChange={onEmailChanged}
                                        validations={[required, validEmail]}
                                    />
                                </div>
                            </div>

                            <div class="col-md-6 mb-4 d-flex align-items-center">
                                <div class="form-outline w-100">
                                    <label htmlFor="password">Parola</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={onChangePassword}
                                        validations={[required]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 container d-flex align-items-center justify-content-center">
                            <button className="btn btn-primary btn-block" ref={signupBtn}>Inregistrare</button>
                        </div>
                    </div>

                )}

                {message && (
                    <div className="form-group">
                        <div
                            className={successful ? "alert alert-success" : "alert alert-danger"}
                            role="alert">
                            {message}
                        </div>
                    </div>
                )}

                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            <div className="ps-3 container d-flex align-items-center justify-content-center pt-4 pb-4">
                <p>Deja un cont? <a href="/login" className="link-danger">Autentificare</a></p>
            </div>
        </div>

    )
}

export default RegisterBusiness