import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/index";
import Navbar from "../../Components/Navbar/index";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Menu from "../../Components/ModalEdit/menu";
import Button from "react-bootstrap/Button";
import AOS from 'aos'
import 'aos/dist/aos.css'

const index = () => {
  const router = useNavigate();
  const [menu, setMenu] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    AOS.init();
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:8000/menu`)
      .then((res) => {
        setData(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setMenu({
      ...menu,
      [e.target.name]: e.target.value,
    });
    console.log(menu);
  };
  const handleUpload = (e) => {
    setMenu((prev) => {
      return { ...prev, photo: e.target.files[0] };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let attr in menu) {
      formData.append(attr, menu[attr]);
    }

    axios
      .post(`http://localhost:8000/menu`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.message !== "Menu Pelatihan created") {
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
          .delete(`http://localhost:8000/menu/${id}`)
          .then((response) => {
            Swal.fire(`${response.data.message}`, 'Your file has been deleted.', 'success');
            window.location.reload();
          })
          .catch((err) => alert(`${err.response}`));
      }
    });
  };

  return (
    <body id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper">
          <div id="content">
            <Navbar />
            <div className="container vw-100">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">
                  Membuat Menu Pelatihan
                </h1>
                {/* <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a> */}
              </div>
              <div className="">
                <div className="card" data-aos="zoom-in-down" data-aos-anchor="#example-anchor" data-aos-offset="500" data-aos-duration="2000">
                  <div className="card-header">
                    Silahkan isi Nama Pelatihan dengan benar
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex">
                        <div className="form-group mx-3">
                          <label htmlFor="nama">Nama Pelatihan</label>
                          <input
                            type="text"
                            name="nama"
                            className="form-control"
                            id="nama"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3 mx-5">
                          <label htmlFor="formFile" className="form-label">
                            Upload Foto Profile
                          </label>
                          <input
                            className="form-control"
                            name="photo"
                            type="file"
                            id="formFile"
                            onChange={handleUpload}
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary mx-3">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <table className="table table-striped" data-aos="zoom-in-up" data-aos-anchor="#example-anchor" data-aos-offset="500" data-aos-duration="2000">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nama Pelatihan</th>
                      <th scope="col">Gambar Pelatihan</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.map((item, index) => (
                        <tr key={item.id}>
                          <th>{index + 1}</th>
                          <td>{item.nama}</td>
                          <td>
                            <img
                              src={item.photo}
                              style={{ maxWidth: "200px" }}
                            />
                          </td>
                          <td>
                            <Menu id={item.id} nama={item.nama}/>
                            <Button className="mx-1" variant="danger" onClick={() => handleDelete(item.id)} style={{ fontSize: "2px" }}><FontAwesomeIcon icon={faTrash} style={{ height: "15px" }} /></Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5">{/* <Pelatihan /> */}</div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default index;
