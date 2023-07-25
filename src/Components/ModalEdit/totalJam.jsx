import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

const totalJam = ({ id, nama, nip, pangkat, jabatan, instansi, npwp, rekening, wi}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({
    nama,
    nip,
    pangkat,
    jabatan,
    instansi,
    npwp,
    rekening,
    wi
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let attr in data) {
      formData.append(attr, data[attr]);
    }

    axios
      .put(`${import.meta.env.VITE_API_ENDPOINT}/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.message !== "User updated") {
          Swal.fire({
            icon: "error",
            title: `${err.response.data.message}`,
            text: "Something went wrong!",
          });
        } else {
          Swal.fire(
            `${res.data.message}`,
            "You clicked the button!",
            "success"
          );
          setTimeout(() => {
            setData([]);
            window.location.reload();
          }, 4000);
        }
      })
      .catch((err) => {
        // console.log(err.response.data);
        Swal.fire({
          icon: "error",
          title: `${err.response.data.message}`,
          text: "Something went wrong!",
        });
      });
  };

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{ fontSize: "2px" }}
      >
        <FontAwesomeIcon icon={faPenToSquare} style={{ height: "15px" }} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="nama"
                value={data.nama}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nip</Form.Label>
              <Form.Control
                type="text"
                name="nip"
                value={data.nip}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Pangkat</Form.Label>
              <Form.Control
                type="text"
                name="pangkat"
                value={data.pangkat}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jabatan</Form.Label>
              <Form.Control
                type="text"
                name="jabatan"
                value={data.jabatan}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Instansi</Form.Label>
              <Form.Control
                type="text"
                name="instansi"
                value={data.instansi}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>NPWP</Form.Label>
              <Form.Control
                type="text"
                name="npwp"
                value={data.npwp}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rekening</Form.Label>
              <Form.Control
                type="text"
                name="rekening"
                value={data.rekening}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>WI</Form.Label>
              <Form.Control
                type="text"
                name="wi"
                value={data.wi}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default totalJam;
