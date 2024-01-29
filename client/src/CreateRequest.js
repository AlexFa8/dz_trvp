import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput } from '@coreui/react';
import { useState } from 'react';

const CreateRequest = ({ bilbordId, loadRequests }) => {
    const [company, setCompany] = useState('');
    const [dateSt, setDateSt] = useState('');
    const [dateFn, setDateFn] = useState('');

    const createRequest = () => {
        const data = {
            company: company,
            date_st: dateSt,
            date_fn: dateFn,
            bilbord_id: bilbordId,
        };
        fetch('http://localhost:8080/api/request', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadRequests();
        });
        setCompany('');
        setDateSt('');
        setDateFn('');
    };

    return (
        <CCol xs={4}>
            <CCard>
                <CCardHeader>Создание заявки</CCardHeader>
                <CCardBody>
                    <CFormInput
                        className="mb-2"
                        placeholder="Компания"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <CFormInput
                        className="mb-2"
                        type="date"
                        placeholder="Дата начала"
                        value={dateSt}
                        onChange={(e) => setDateSt(e.target.value)}
                    />
                    <CFormInput
                        className="mb-2"
                        type="date"
                        placeholder="Дата окончания"
                        value={dateFn}
                        onChange={(e) => setDateFn(e.target.value)}
                    />
                    <CButton className="text-center" size="sm" onClick={createRequest}>
                        Создать
                    </CButton>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default CreateRequest;
