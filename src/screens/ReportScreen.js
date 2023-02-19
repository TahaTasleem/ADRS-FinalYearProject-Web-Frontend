import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import moment from 'moment';

const ReportScreen = () => {
    const [datas, setDatas] = useState([]);
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
            console.log(res.data.message);
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
                            datas.map((record,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{record.riderId}</td>
                                        <td>{record.time}</td>
                                        <td>{record.city}</td>
                                        <td>{record.status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
        </>
    );
}
export default ReportScreen;