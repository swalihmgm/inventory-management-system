import React, { useEffect, useState } from "react";
import { Row, Col, Card } from 'react-bootstrap'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import Layout from '../compenents/Layout'
import { assetData } from "../data/mockData";
import api from "../api/axios";
        
function Dashbord() {
    
const [assets, setAssets] = useState([]);
const [inventory, setInventory] = useState([]);
const [tickets, setTickets] = useState([]);
const [users, setUsers] =useState([]);


useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const [assetRes, inventoryRes, ticketRes, userRes] = await Promise.all([
      api.get("api/assets/"),
      api.get("api/inventory/"),
      api.get("api/tickets/"),
      api.get("api/users/"),
    ]);

    setAssets(assetRes.data);
    setInventory(inventoryRes.data);
    setTickets(ticketRes.data);
    setUsers(userRes.data);
  } catch (error) {
    console.log(error.response?.data);
  }
};

    return (
        <Layout>

            <Row>
                <Col md={3} >
                    <Card className='bg-danger' style={{ color: "white" }}>
                        <Card.Body>
                            <h2>Tottal Assets</h2>
                            <h5>{assets.length}</h5>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className='bg-primary' style={{ color: "white" }}>
                        <Card.Body>
                            <h2>Inventory</h2>
                            <h5>{inventory.length}</h5>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className='bg-dark' style={{ color: "white" }}>
                        <Card.Body>
                            <h2>Open Tickets</h2>
                            <h5>{tickets.length}</h5>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className='bg-success' style={{ color: "white" }}>
                        <Card.Body>
                            <h2>Users</h2>
                            <h5>{users.length}</h5>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <Card>
                        <Card.Body>
                            <h1>Assets added per month</h1>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={assetData}>
                                    <CartesianGrid strokeDasharray={'3 3'} />
                                    <XAxis dataKey={"month"} />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="assets" fill="#0d6efd" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Layout>
    )
}

export default Dashbord
