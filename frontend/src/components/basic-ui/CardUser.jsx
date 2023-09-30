import { useState, React, useRef, useEffect } from 'react'
import { CCol, CCard, CCardBody, CCardTitle, CCardText, CButton, CCardHeader, CCardImage, CForm, CFormInput } from '@coreui/react';
import AuthService from 'services/auth/auth.service';
import DataService from 'services/auth/user.service';

const CardUser = () => {
    let currentUser = AuthService.getCurrentUser();
    const form = useRef();

    const [disabled, setDisabled] = useState(true);
    const [buttonText, setButtonText] = useState("Editare")
    const [firstName, setFirstName] = useState(currentUser.firstName)
    const [lastName, setLastName] = useState(currentUser.lastName)
    const [phoneno, setPhone] = useState(currentUser.phone)
    const [email, setEmail] = useState(currentUser.email)
    const [image, setImage] = useState({ preview: '', data: '' })

    const [userImage, setUserImage] = useState('')
    const [user, setUser] = useState('')

    const accessToken = currentUser.accessToken;
    const id = currentUser.id;
    const photo = currentUser.photo;
    const tip = currentUser.tip;

    useEffect(() => {
        currentUser = AuthService.getCurrentUser()
        DataService.getUserById(currentUser.id).then((data) => {
            setUser(data)
        })
    }, [user]);

    const onChangeFirstName = (e) => {
        const value = e.target.value;
        setFirstName(value);
    }

    const onChangeLastName = (e) => {
        const value = e.target.value;
        setLastName(value);
    }

    const onChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    }

    const onChangePhone = (e) => {
        const value = e.target.value;
        setPhone(value);
    }

    const onChangeImage = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }

    const onClickButton = (e) => {
        if (buttonText == "Editare") {
            setButtonText("Save")
            setDisabled(false)
        } else {
            setButtonText("Editare")
            setDisabled(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const imgPreview = image.preview;
        if (disabled) {
            DataService.updateUser(currentUser.id, firstName, lastName, phoneno, email, userImage)
                .then(() =>
                    localStorage.setItem("user",
                        JSON.stringify({ accessToken: accessToken, email: email, firstName: firstName, id: id, lastName: lastName, phone: phoneno, photo: " ", tip: tip })))
        }
    }

    return (
        <>
            <CCol sm={4}>
                <CCard>
                    <CCardHeader>Profilul meu</CCardHeader>
                    <div className='text-center'>
                        {(user.photo !== "" &&
                            <CCardImage src={`http://localhost:8080/${user.photo}`} style={{ maxWidth: 55 + '%', maxHeight: 55 + '%' }} className='rounded-circle' />
                        )}
                    </div>

                    <CCardBody>
                        <CForm className="row g-3" ref={form} onSubmit={handleSubmit}>
                            <CCol md={12}>
                                <CFormInput type="text" id="inputEmail4" label="FirstName" disabled={disabled} value={firstName} onChange={onChangeFirstName} />
                            </CCol>
                            <CCol md={12}>
                                <CFormInput type="text" id="inputEmail4" label="LastName" disabled={disabled} value={lastName} onChange={onChangeLastName} />
                            </CCol>
                            <CCol md={12}>
                                <CFormInput type="text" id="inputEmail4" label="phone" disabled={disabled} value={phoneno} onChange={onChangePhone} />
                            </CCol>
                            <CCol md={12}>
                                <CFormInput type="text" id="inputEmail4" label="Email" disabled={disabled} value={email} onChange={onChangeEmail} />
                            </CCol>
                            <CCol md={12}>
                                <CFormInput type="file" name="image" id="inputEmail4" label="Photo" disabled={disabled} onChange={(e) => setUserImage(e.target.files[0])} />
                            </CCol>
                            <CCol xs={12} className=''>
                                <CButton type="submit" onClick={onClickButton} >{buttonText}</CButton>
                            </CCol>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </>
    )
}

export default CardUser