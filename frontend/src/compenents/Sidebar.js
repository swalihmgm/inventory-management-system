import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Sidebar() {
  return (
    <Nav className="flex-column bg-light vh-100 p-3">
      <Nav.Link as={Link} to="/dashbord">
        Dashbord
      </Nav.Link>
      <Nav.Link as={Link} to="/inventory">
        Inventory
      </Nav.Link>
      <Nav.Link as={Link} to="/tickets">
        Tickets
      </Nav.Link>
      <Nav.Link as={Link} to="/assets">
        Assets
      </Nav.Link>
      <Nav.Link as={Link} to="/assignments">
        Assignments
      </Nav.Link>
      <Nav.Link as={Link} to="/chat">
        AI Assistant
      </Nav.Link>
    </Nav>
  );
}

export default Sidebar;
