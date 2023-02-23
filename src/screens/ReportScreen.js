import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from 'react-bootstrap/Table';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

const ReportScreen = () => {
    const [datas, setDatas] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [riderData, setRiderData] = useState([]);
    const config = {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        }
    };
    const getReport = async () => {
        try {
            const url = "http://localhost:3000/api/report/";
            const res = await axios.get(url, config);
            const report_data = res.data.message.map(item => {
                return {
                    riderId: item.riderId,
                    time: moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
                    city: item.city,
                    status: item.status
                }
            });
            setDatas(report_data);
        }
        catch (error) {
            console.log(error);
        }
    }
    const modalOpen = async (riderId) => {
        setShow(true);
        try {
            const url = "http://localhost:3000/api/rider/specific/" + riderId;
            const res = await axios.get(url, config);
            const data = {
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                NIC: res.data.NIC,
                cell: res.data.cell,
                vehicleRegNo: res.data.vehicleRegistrationNumber,
                vehicletype: res.data.vehicleType
            };
            console.log(data);
            setRiderData([data]);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getReport();
    }, []);
    return (
        <>
            <Header />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Rider Id</th>
                        <th>Time</th>
                        <th>City</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datas.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><button onClick={() => modalOpen(record.riderId)} style={{textDecoration:"underline",border:"none"}}>{record.riderId}</button></td>
                                    <td>{record.time}</td>
                                    <td>{record.city}</td>
                                    <td>{record.status}</td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Rider Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        riderData.map((record,index)=>{
                            return(
                                <React.Fragment key={index}>
                                <p>FirstName: <b>{record.firstName}</b></p>
                                <p>LastName: <b>{record.lastName}</b></p>
                                <p>NIC: <b>{record.NIC}</b></p>
                                <p>Cell No: <b>{record.cell}</b></p>
                                <p>Vehicle Registration No: <b>{record.vehicleRegNo}</b></p>
                                <p>Vehicle Type: <b>{record.vehicletype}</b></p>
                                </React.Fragment>
                            )
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ReportScreen;