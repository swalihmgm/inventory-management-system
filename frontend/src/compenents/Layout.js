import React from 'react'
import TopNavbar from './Navbar'
import { Col, Container, Row } from 'react-bootstrap'
import Sidebar from './Sidebar'

function Layout({children}) {
  return (
    <div>
      <TopNavbar/>
      <Container fluid>
            <Row>
                <Col md={2}>
                    <Sidebar/>
                </Col>
                <Col md={10} className='p-4'>
                    {children}
                </Col>
            </Row>
      </Container>
    </div>
  )
}

export default Layout
