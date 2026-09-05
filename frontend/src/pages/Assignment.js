import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import Layout from "../compenents/Layout";
import api from "../api/axios";

function Assignment() {
  const [assignments, setAssignments] = useState([]);
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);

  const [show, setShow] = useState(false);

  const [asset, setAsset] = useState("");
  const [employee, setEmployee] = useState("");
  const [dateReturned, setDateReturned] = useState("");

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAssignments();
    fetchAssets();
    fetchUsers();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await api.get("api/assignments/");
      setAssignments(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await api.get("api/assets/");
      setAssets(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("api/users/");
      setUsers(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleEdit = (assignment) => {
    setIsEditing(true);
    setEditId(assignment.id);

    setAsset(assignment.asset);
    setEmployee(assignment.employee);
    setDateReturned(assignment.date_returned || "");

    setShow(true);
  };

  const handleSave = async () => {
    try {
      const data = {
        asset,
        employee,
        date_returned: dateReturned || null,
      };

      if (isEditing) {
        await api.put(`api/assignments/${editId}/`, data);
      } else {
        await api.post("api/assignments/", data);
      }

      await fetchAssignments();

      setShow(false);

      setAsset("");
      setEmployee("");
      setDateReturned("");

      setEditId(null);
      setIsEditing(false);
    } catch (error) {
      console.log(error.response?.data);
      alert("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`api/assignments/${id}/`);

      await fetchAssignments();
    } catch (error) {
      console.log(error.response?.data);
      alert("Something went wrong!");
    }
  };
  return (
    <Layout>
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Asset Assignments</h2>

          <Button
            onClick={() => {
              setIsEditing(false);
              setEditId(null);

              setAsset("");
              setEmployee("");
              setDateReturned("");

              setShow(true);
            }}
          >
            Assign Asset
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Asset</th>
              <th>Employee</th>
              <th>Date Assigned</th>
              <th>Date Returned</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.id}</td>

                <td>
                  {assets.find((a) => a.id === assignment.asset)?.name ||
                    assignment.asset}
                </td>

                <td>
                  {users.find((u) => u.id === assignment.employee)?.username ||
                    assignment.employee}
                </td>

                <td>{assignment.date_assigned}</td>

                <td>{assignment.date_returned || "-"}</td>

                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(assignment)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(assignment.id)}
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
              {isEditing ? "Edit Assignment" : "Assign Asset"}
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
                <Form.Label>Employee</Form.Label>

                <Form.Select
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                >
                  <option value="">Select Employee</option>

                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date Returned</Form.Label>

                <Form.Control
                  type="date"
                  value={dateReturned}
                  onChange={(e) => setDateReturned(e.target.value)}
                />
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

export default Assignment;
