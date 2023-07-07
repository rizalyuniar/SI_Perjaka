import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

const listPengajar = ({ id, nama_pelatihan, materi, durasi, tanggal }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({
    nama_pelatihan,
    materi,
    durasi,
    tanggal,
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

    axios
      .put(`http://localhost:8000/pelatihan/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.message !== "Pelatihan updated") {
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
              <Form.Label>Nama Pelatihan</Form.Label>
              <Form.Control
                type="text"
                name="nama_pelatihan"
                value={data.nama_pelatihan}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Penugasan/Materi</Form.Label>
              <Form.Control
                type="text"
                name="materi"
                value={data.materi}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Durasi Mengajar</Form.Label>
              <Form.Control
                type="number"
                name="durasi"
                value={data.durasi}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tanggal Mengajar</Form.Label>
              <Form.Control
                type="text"
                name="tanggal"
                value={data.tanggal}
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

export default listPengajar;
