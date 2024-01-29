import { useState, useEffect } from 'react';
import { CCard, CContainer, CRow, CCol, CCardBody, CCardHeader } from '@coreui/react';
import './App.css';
import CreateBilbord from './CreateBilbord';
import Bilbord from './Bilbord';

const App = () => {
    const [bilbords, setBilbords] = useState([]);

    useEffect(() => {
        loadBilbords();
    }, []);

    const loadBilbords = () => {
        fetch('http://localhost:8080/api/bilbord', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setBilbords(data);
            });
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Билборды</CCardHeader>
                            <CCardBody>
                                {!!bilbords.length &&
                                    bilbords.map((item) => {
                                        return (
                                            <Bilbord
                                                key={item.id}
                                                loadBilbords={() => loadBilbords()}
                                                item={item}
                                                bilbords={bilbords}
                                            />
                                        );
                                    })}
                                <CreateBilbord loadBilbords={() => loadBilbords()} />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default App;
