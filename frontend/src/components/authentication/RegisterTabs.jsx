import Header from 'components/shared/Header'
import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Register from './Register'
import RegisterBusiness from './RegisterBusiness'
import Footer from 'components/shared/Footer'

export default function RegisterTabs() {
    const [tabKey, initTabKey] = useState('one')

    return (
        <div>
            <Header></Header>
            <div className='container pt-3 mt-5 w-50'>
                <h2 className="pt-5 text-center"><h3>Inregistrare <strong>Donor</strong>.</h3></h2>
                <Tabs activeKey={tabKey} onSelect={(e) => initTabKey(e)} className='mt-5 border border-0'>
                    <Tab eventKey="one" title="Pentru Utilizatori/Voluntari">
                        <Register></Register>
                    </Tab>
                    <Tab eventKey="two" title="Pentru Business">
                        <RegisterBusiness></RegisterBusiness>
                    </Tab>
                    {/* <Tab eventKey="three" title="Volunteer">
                        <p>Tab 3</p>
                    </Tab>
                    <Tab eventKey="four" title="Organizations">
                        <p>Tab 4</p>
                    </Tab> */}
                </Tabs>
            </div>
            <Footer/>
        </div>

    )
}