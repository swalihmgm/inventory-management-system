import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Table, Form } from "react-bootstrap";
import Layout from "../compenents/Layout";
import api from "../api/axios";

function Assets() {
  const [show, setShow] = useState(false);
  const [assets, setAssets] = useState([]);

  const [name, setName] = useState("");
  const [assetType, setAssetType] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [status, setStatus] = useState("AVAILABLE");

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await api.get("api/assets/");
      setAssets(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const resetForm = () => {
    setShow(false);

    setName("");
    setAssetType("");
    setSerialNumber("");
    setPurchaseDate("");
    setStatus("AVAILABLE");

    setEditId(null);
    setIsEditing(false);
  };

  const handleEdit = (asset) => {
    setIsEditing(true);
    setEditId(asset.id);

    setName(asset.name);
    setAssetType(asset.asset_type);
    setSerialNumber(asset.serial_number);
    setPurchaseDate(asset.purchase_date);
    setStatus(asset.status);

    setShow(true);
  };

  const handleSave = async () => {
    try {
      const data = {
        name,
        asset_type: assetType,
        serial_number: serialNumber,
        purchase_date: purchaseDate,
        status,
      };

      if (isEditing) {
        await api.put(`api/assets/${editId}/`, data);
      } else {
        await api.post("api/assets/", data);
      }

      await fetchAssets();
      resetForm();
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.status);
      console.log(error.response?.data);

      alert("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`api/assets/${id}/`);
      await fetchAssets();
    } catch (error) {
      console.log(error.response?.data);
      alert("Something went wrong!");
    }
  };

  return (
    <Layout>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Assets</h1>

          <Button
            onClick={() => {
              setIsEditing(false);
              setEditId(null);

              setName("");
              setAssetType("");
              setSerialNumber("");
              setPurchaseDate("");
              setStatus("AVAILABLE");

              setShow(true);
            }}
          >
            Add Asset
          </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Asset Type</th>
              <th>Serial Number</th>
              <th>Purchase Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.name}</td>
                <td>{asset.asset_type}</td>
                <td>{asset.serial_number}</td>
                <td>{asset.purchase_date}</td>
                <td>{asset.status}</td>

                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(asset)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(asset.id)}
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
            <Modal.Title>{isEditing ? "Edit Asset" : "Add Asset"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Asset Type</Form.Label>
                <Form.Control
                  type="text"
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Serial Number</Form.Label>
                <Form.Control
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>

                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="ASSAIGNED">Assigned</option>
                  <option value="UNDER_REPAIR">Under Repair</option>
                </Form.Select>
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

export default Assets;
