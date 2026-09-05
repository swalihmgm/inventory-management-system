import React from 'react'
import {Navbar, Container} from 'react-bootstrap'
function TopNavbar() {
  return (
    <Navbar bg='dark' variant='dark'>
        <Container fluid>
            <Navbar.Brand>Asset Management</Navbar.Brand>
        </Container>
    </Navbar>
  )
}

export default TopNavbar
