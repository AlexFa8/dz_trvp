import { CCard, CCardBody, CButton, CFormInput, CContainer, CRow } from '@coreui/react';
import { useState, useEffect } from 'react';
import Request from './Request';
import CreateRequest from './CreateRequest';

const Bilbord = ({ item, loadBilbords, bilbords }) => {
    const [edit, setEdit] = useState(false);
    const [addres, setAddres] = useState('');
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadRequests();
    }, []);

    useEffect(() => {
        setAddres(item.addres);
    }, [item]);

    const loadRequests = () => {
        fetch(`http://localhost:8080/api/bilbord_requests/${item.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setRequests(data);
            });
    };

    const deleteBilbord = (id) => {
        fetch(`http://localhost:8080/api/bilbord/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadBilbords();
        });
    };

    const editBilbord = (id) => {
        const data = { id: id, addres: addres };
        fetch(`http://localhost:8080/api/bilbord`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadBilbords();
            setEdit(false);
        });
    };

    return (
        <CCard className="mb-3" key={item.id}>
            <CCardBody>
                <div className="d-flex">
                    {!edit ? (
                        <span className="pt-1">{item.addres}</span>
                    ) : (
                        <CFormInput value={addres} className="w-25" onChange={(e) => setAddres(e.target.value)} />
                    )}
                    {!edit ? (
                        <CButton size="sm" className="ms-2" color="warning" onClick={() => setEdit(true)}>
                            Редактировать
                        </CButton>
                    ) : (
                        <CButton size="sm" className="ms-2" color="success" onClick={() => editBilbord(item.id)}>
                            Сохранить
                        </CButton>
                    )}
                    <CButton size="sm" className="ms-2" color="danger" onClick={() => deleteBilbord(item.id)}>
                        Удалить
                    </CButton>
                </div>
                <hr />
                <CContainer fluid className="p-0 m-0">
                    <CRow>
                        {!!requests.length &&
                            requests.map((item) => {
                                return (
                                    <Request
                                        key={item.id}
                                        item={item}
                                        loadRequests={() => loadRequests()}
                                        bilbords={bilbords}
                                        loadBilbords={() => loadBilbords()}
                                    />
                                );
                            })}
                        <CreateRequest
                            bilbordId={item.id}
                            loadRequests={() => loadRequests()}
                            loadBilbords={() => loadBilbords()}
                        />
                    </CRow>
                </CContainer>
            </CCardBody>
        </CCard>
    );
};
export default Bilbord;
