import { CCol, CCardBody, CCard, CButton, CFormSelect } from '@coreui/react';
import { useState } from 'react';

const Request = ({ item, loadRequests, bilbords, loadBilbords }) => {
    const [selectedBilbord, setSelectedBilbord] = useState('');

    const deleteRequest = () => {
        fetch(`http://localhost:8080/api/request/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadRequests();
        });
    };

    const editRequest = () => {
        const data = {
            id: item.id,
            date_st: item.date_st.slice(0, 10),
            date_fn: item.date_fn.slice(0, 10),
            bilbord_id: selectedBilbord,
        };
        fetch(`http://localhost:8080/api/request`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            window.location.reload();
        });
    };

    return (
        <CCol xs={4}>
            <CCard>
                <CCardBody>
                    <div>Компания: {item.company}</div>
                    <div>Начало: {new Date(item.date_st).toDateString()}</div>
                    <div>Конец: {new Date(item.date_fn).toDateString()}</div>
                    <hr />
                    <CFormSelect label="Куда перенести?" onChange={(e) => setSelectedBilbord(e.target.value)}>
                        <option value=""> </option>
                        {bilbords
                            .filter((bilbord) => {
                                return bilbord.id !== item.bilbord_id;
                            })
                            .map((bilbord) => {
                                return (
                                    <option key={bilbord.id} value={bilbord.id}>
                                        {bilbord.addres}
                                    </option>
                                );
                            })}
                    </CFormSelect>
                    <CButton className="mt-2 me-2" size="sm" onClick={() => editRequest()}>
                        Перенести
                    </CButton>
                    <CButton className="mt-2" size="sm" color="danger" onClick={() => deleteRequest()}>
                        Удалить
                    </CButton>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default Request;
