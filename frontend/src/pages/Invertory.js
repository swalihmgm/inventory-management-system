import React, { useEffect, useState } from "react";
import { Button, Container, Table, Modal, Form } from "react-bootstrap";
// import { inventory } from '../data/mockData'
import Layout from "../compenents/Layout";
import api from "../api/axios";
function Invertory() {
  const [inventory, setInventory] = useState([]);

  const [show, setShow] = useState(false);

  const [itemType, setItemType] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [threshold, setThreshold] = useState(5);

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await api.get("api/inventory/");
      setInventory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);

    setItemType(item.item_type);
    setType(item.type);
    setQuantity(item.quantity);
    setThreshold(item.threshold);

    setShow(true);
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await api.put(`api/inventory/${editId}/`, {
          item_type: itemType,
          type,
          quantity,
          threshold,
        });
      } else {
        await api.post("api/inventory/", {
          item_type: itemType,
          type,
          quantity,
          threshold,
        });
      }

      await fetchInventory();

      setShow(false);

      setItemType("");
      setType("");
      setQuantity(1);
      setThreshold(5);

      setEditId(null);
      setIsEditing(false);
    } catch (error) {
      console.log(error.response?.data);
      alert("Something went wrong!");
    }
  };

const handleDelete = async (id) => {
  try {
    await api.delete(`api/inventory/${id}/`);
    await fetchInventory();
  } catch (error) {
    console.log(error.response?.data);
    alert("Something went wrong!");
  }
};

const resetForm = () => {
  setShow(false);

  setItemType("");
  setType("");
  setQuantity(1);
  setThreshold(5);

  setEditId(null);
  setIsEditing(false);
};

  return (
    <Layout>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Inventory</h2>

          <Button
            onClick={() => {
              setIsEditing(false);
              setEditId(null);

              setItemType("");
              setType("");
              setQuantity(1);
              setThreshold(5);

              setShow(true);
            }}
          >
            Add Inventory
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Type</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Threshold</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.item_type}</td>
                <td>{item.type}</td>
                <td>{item.quantity}</td>
                <td>{item.threshold}</td>

                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={show} onHide={resetForm}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditing ? "Edit Inventory" : "Add Inventory"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Item Type</Form.Label>
                <Form.Control
                  type="text"
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Threshold</Form.Label>
                <Form.Control
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={resetForm}>
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

export default Invertory;
