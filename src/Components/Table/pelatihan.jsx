import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Pelatihan from '../ModalEdit/pelatihan';
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

const pelatihan = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Swal.fire({
      title: 'Loading... <br> Memuat Data',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/pelatihan/detail`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res?.data?.data);
        Swal.close();
        // console.log(res?.data?.data);
      })
      .catch((err) => {
        console.log(err)
        Swal.close();
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_ENDPOINT}/pelatihan/${id}`)
          .then((response) => {
            Swal.fire(`${response.data.message}`, 'Your file has been deleted.', 'success');
            window.location.reload();
          })
          .catch((err) => alert(`${err.response.data.message}`));
      }
    });
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nama Pelatihan</th>
          <th scope="col">Penugasan/Materi</th>
          <th scope="col">Durasi Mengajar</th>
          <th scope="col">Tanggal Mengajar</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
      {data && data.map((item, index) => (
        <tr key={item.id}>
          <th>{index + 1}</th>
          <td>{item.nama_pelatihan}</td>
          <td>{item.materi}</td>
          <td>{item.durasi}</td>
          <td>{item.tanggal}</td>
          <td>
            <Pelatihan id={item.id} nama_pelatihan={item.nama_pelatihan} materi={item.materi} durasi={item.durasi} tanggal={item.tanggal} />
            <Button className="mx-1" variant="danger" onClick={() => handleDelete(item.id)} style={{ fontSize: "2px" }}><FontAwesomeIcon icon={faTrash} style={{ height: "15px" }} /></Button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default pelatihan;
