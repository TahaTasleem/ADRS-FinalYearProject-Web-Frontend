import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from 'react-bootstrap/Table';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import AlertReport from './AlertReport';

const statusOptions = ['inactive', 'active'];

const ReportScreen = () => {
    const [datas, setDatas] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [riderData, setRiderData] = useState([]);

    const data = {
        firstName: "",
        lastName: "",
        NIC: "",
        cell: "",
        vehicleRegNo: "",
        vehicletype: ""
    };
    const config = {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        }
    };
    const getRiderInfo = async (riderId) => {
        try {
            const url = "http://localhost:3000/api/rider/specific/" + riderId;
            const res = await axios.get(url, config);
            data.firstName = res.data.firstName;
            data.lastName = res.data.lastName;
            data.NIC = res.data.NIC;
            data.cell = res.data.cell;
            data.vehicleRegNo = res.data.vehicleRegistrationNumber;
            data.vehicletype = res.data.vehicleType;
            setRiderData([data]);
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    const getReport = async () => {
        try {
            const url = "http://localhost:3000/api/report/";
            const res = await axios.get(url, config);

            const report_data = await Promise.all(
                res.data.message.map(async (item) => {
                    const riderInfo = await getRiderInfo(item.riderId);
                    return {
                        riderName: `${riderInfo.firstName} ${riderInfo.lastName}`,
                        id: item._id,
                        riderId: item.riderId,
                        time: moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
                        accidentLocation: item.accidentLocation,
                        status: item.status,
                    };
                })
            );
            setDatas(report_data);
        } catch (error) {
            console.log(error);
        }
    };
    // const getRiderInfo = async(riderId) =>{
    //     try{
    //         const url = "http://localhost:3000/api/rider/specific/" + riderId;
    //         const res = await axios.get(url, config);
    //             data.firstName= res.data.firstName;
    //             data.lastName= res.data.lastName;
    //             data.NIC= res.data.NIC;
    //             data.cell= res.data.cell;
    //             data.vehicleRegNo= res.data.vehicleRegistrationNumber;
    //             data.vehicletype= res.data.vehicleType;
    //             // console.log(data);
    //             setRiderData([data]);
    //         } 
    //     catch (error) {
    //         console.log(error);
    //     }
    // }
    // const getReport = async () => {
    //     try {
    //         const url = "http://localhost:3000/api/report/";
    //         const res = await axios.get(url, config);
    //         getRiderInfo(res.data.message[0].riderId);
    //         const report_data = res.data.message.map(item => {
    //             return {
    //                 riderName:data.firstName,
    //                 riderId: item.riderId,
    //                 time: moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
    //                 city: item.city,
    //                 status: item.status
    //             }
    //         });
    //         setDatas(report_data);
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }
    const HandleStatusChange = async (event, id) => {
        const putUrl = "http://localhost:3000/api/report/update/" + id;
        const updateRiderInfo = {
            "updates":{
            "status": event.target.value
            }}
        const res = await axios.put(putUrl, updateRiderInfo, config);
        window.location.reload();
    };
    const modalOpen = async (riderId) => {
        setShow(true);
        getRiderInfo(riderId);

    }
    useEffect(() => {
        getReport();
    }, []);
    return (
        <>
            <AlertReport />
            <Header />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Rider Name</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datas.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><button onClick={() => modalOpen(record.riderId)} style={{ textDecoration: "underline", border: "none" }}>{record.riderName}</button></td>
                                    <td>{record.time}</td>
                                    <td><a href={record.accidentLocation} target='_blank'>{record.accidentLocation}</a></td>
                                    <td>  <select value={record.status} onChange={(e) => HandleStatusChange(e, record.id)}>
                                        {statusOptions.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select></td>
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
                        riderData.map((record, index) => {
                            return (
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