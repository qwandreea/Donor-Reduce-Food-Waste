import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "services/auth/auth.service";

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


function Register() {
    const form = useRef();
    const checkBtn = useRef();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [isVolunteer, setIsVolunteer] = useState(false)
    const [organisation, setOrganisation] = useState("")


    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };

    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    }

    const onChangePhone = (e) => {
        const phone = e.target.value;
        setPhone(phone);
    }

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeIsVolunteer = (e) => {
        const value = e.target.checked;
        setIsVolunteer(value);

    }

    const onChangeOrganisation = (e) => {
        const organisation = e.target.value;
        setOrganisation(organisation);
        console.log(organisation)
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(firstName, lastName, phone, email, password, isVolunteer, organisation).then(
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
    };

    return (
        <div className="container-fluid border-top ">
            <div class="pt-3">
                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="mb-4 ">
                                <label htmlFor="firstNameRegister1" className="form-label">First name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="firstNameRegister1"
                                    name="firstName"
                                    value={firstName}
                                    onChange={onChangeFirstName}
                                    validations={[required]}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstName">Last name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={lastName}
                                    onChange={onChangeLastName}
                                    validations={[required]}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstName">Contact number</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={phone}
                                    onChange={onChangePhone}
                                    validations={[required]}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required]}
                                />
                            </div>

                            <div className="mb-3 input-group">
                                <Input
                                    type="checkbox"
                                    name="check"
                                    className="form-check-input"
                                    value={isVolunteer}
                                    onChange={onChangeIsVolunteer}
                                />
                                <label htmlFor="check">&nbsp; &nbsp; Became volunteer</label>
                            </div>

                            {(isVolunteer &&
                                <div className="mb-3">
                                    <label htmlFor="organisation">Represented organisation</label>
                                    {isVolunteer}
                                    <Input
                                        type="text"
                                        name="organisation"
                                        className="form-control"
                                        validations = {[required]}
                                        value = {organisation}
                                        onChange = {onChangeOrganisation}
                                    />
                                </div>
                            )}

                            <div className="mb-3 container d-flex align-items-center justify-content-center">
                                <button className="btn btn-primary btn-block">Signup</button>
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
                <div className="container d-flex align-items-center justify-content-center pt-4 pb-4">
                    <p>Already an account? <a href="/login" className="link-danger">Login</a></p>
                </div>
            </div>
        </div>
    )
}

export default Register;