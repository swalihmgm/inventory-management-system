import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import Layout from "../compenents/Layout";
import api from "../api/axios";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);

  const [show, setShow] = useState(false);

  const [asset, setAsset] = useState("");
  const [issue, setIssue] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [assignedTechnician, setAssignedTechnician] = useState("");

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTickets();
    fetchAssets();
    fetchUsers();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await api.get("api/tickets/");
      setTickets(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const fetchAssets = async () => {
  try {
    const response = await api.get("api/assets/");
    console.log("Assets Response:", response.data);
    setAssets(response.data);
  } catch (error) {
    console.log("Assets Error:", error.response?.data);
  }
};

const fetchUsers = async () => {
  try {
    const response = await api.get("api/users/");
    console.log("Users Response:", response.data);
    setUsers(response.data);
  } catch (error) {
    console.log("Users Error:", error.response?.data);
  }
};
  const handleEdit = (ticket) => {
    setIsEditing(true);
    setEditId(ticket.id);

    setAsset(ticket.asset);
    setIssue(ticket.issue);
    setStatus(ticket.status);
    setAssignedTechnician(ticket.assigned_technician || "");

    setShow(true);
  };
  const handleSave = async () => {
    try {
      const data = {
        asset,
        issue,
        status,
        assigned_technician: assignedTechnician || null,
      };

      if (isEditing) {
        await api.put(`api/tickets/${editId}/`, data);
      } else {
        await api.post("api/tickets/", data);
      }

      await fetchTickets();

      setShow(false);

      setAsset("");
      setIssue("");
      setStatus("PENDING");
      setAssignedTechnician("");

      setEditId(null);
      setIsEditing(false);
    } catch (error) {
      console.log(error.response?.data);
      alert("Something went wrong!");
    }
  };
  const handleDelete = async (id) => {
    try {
      await api.delete(`api/tickets/${id}/`);
      await fetchTickets();
    } catch (error) {
      console.log(error.response?.data);
      alert("Something went wrong!");
    }
  };
  return (
    <Layout>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Repair Tickets</h2>

          <Button
            onClick={() => {
              setIsEditing(false);
              setEditId(null);

              setAsset("");
              setIssue("");
              setStatus("PENDING");
              setAssignedTechnician("");

              setShow(true);
            }}
          >
            Add Ticket
          </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Asset</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Technician</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>

                <td>
                  {assets.find((a) => a.id === ticket.asset)?.name ||
                    ticket.asset}
                </td>

                <td>{ticket.issue}</td>

                <td>{ticket.status}</td>

                <td>
                  {users.find((u) => u.id === ticket.assigned_technician)
                    ?.username || "-"}
                </td>

                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(ticket)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(ticket.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditing ? "Edit Repair Ticket" : "Add Repair Ticket"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Asset</Form.Label>
                <Form.Select
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                >
                  <option value="">Select Asset</option>

                  {assets.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Issue</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="FIXED">Fixed</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Technician</Form.Label>
                <Form.Select
                  value={assignedTechnician}
                  onChange={(e) => setAssignedTechnician(e.target.value)}
                >
                  <option value="">Select Technician</option>

                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>

            <Button variant="primary" onClick={handleSave}>
              {isEditing ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Layout>
  );
}

export default Tickets;
