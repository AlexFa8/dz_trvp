import { useState } from 'react';
import { CCard, CCardBody, CFormInput, CButton, CCardHeader } from '@coreui/react';

const CreateBilbord = ({ loadBilbords }) => {
    const [addres, setAddres] = useState('');

    const createBilbord = () => {
        const data = {
            addres: addres,
        };
        fetch('http://localhost:8080/api/bilbord', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadBilbords();
        });
        setAddres('');
    };

    return (
        <CCard>
            <CCardHeader>Создание билборда</CCardHeader>
            <CCardBody className="d-flex">
                <CFormInput placeholder="Адрес" value={addres} onChange={(e) => setAddres(e.target.value)} />
                <CButton className="ms-3" onClick={createBilbord}>
                    Создать
                </CButton>
            </CCardBody>
        </CCard>
    );
};

export default CreateBilbord;
