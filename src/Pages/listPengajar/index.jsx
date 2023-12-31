import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/index";
import Sidebar from "../../Components/Sidebar/index";
import Footer from "../../Components/Footer/index";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import List from "../../Components/ModalEdit/listPengajar";
import Swal from "sweetalert2";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Link } from "react-router-dom";

const index = () => {
  const role = localStorage.getItem("role");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [sortBY, setSortBy] = useState("name");
  // const [sort, setsortOrder] = useState("asc");

  useEffect(() => {
    AOS.init();
    filterPengajar(search, currentPage);
  }, [])

  const filterPengajar = (key, page) => {
    Swal.fire({
      title: 'Loading... <br> Memuat Data',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/pelatihan?search=${search ? search : ""}&page=${page ? page : 1}`)
      .then((res) => {
        setData(res?.data?.data);
        setPagination(res.data.pagination);
        setLoading(false);
        Swal.close();
        console.log(res?.data?.data);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
        Swal.close();
      });
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      filterPengajar(search, currentPage);
    }
  };
  const handlePage = (page) => {
    setCurrentPage(page);
    filterPengajar(search, page);
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
    <body id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container vw-100">
              {role === "admin" ? (
                <>
                  <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Daftar Pengajar Mengikuti Pelatihan</h1>
                    <Link to="/cetak" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                      <i class="fas fa-download fa-sm text-white-50"></i> Cetak Dokumen
                    </Link>
                  </div>
                  <table className="table table-striped" data-aos="zoom-in-down" data-aos-duration="2000">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nama Pengajar</th>
                        <th scope="col">Nama Pelatihan</th>
                        <th scope="col">Penugasan/Materi</th>
                        <th scope="col">Durasi Mengajar</th>
                        <th scope="col">Tanggal Mengajar</th>
                        <th scope="col">Waktu Absensi</th>
                        <th scope="col">Update Absensi</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((item, index) => (
                          <tr key={item.id}>
                            <th>{index + 1}</th>
                            <td>{item.nama}</td>
                            <td>{item.nama_pelatihan}</td>
                            <td>{item.materi}</td>
                            <td>{item.durasi} Jam</td>
                            <td>{item.tanggal}</td>
                            <td>{item.created_at}</td>
                            <td>{item.updated_at}</td>
                            <td>
                              <List id={item.id} nama_pelatihan={item.nama_pelatihan} materi={item.materi} durasi={item.durasi} tanggal={item.tanggal} />
                              <Button className="mx-1" variant="danger" onClick={() => handleDelete(item.id)} style={{ fontSize: "2px" }}><FontAwesomeIcon icon={faTrash} style={{ height: "15px" }} /></Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="justify-content-center d-flex mt-2 mb-3">
                    <div className="">
                      {pagination && (
                        <>
                          {pagination.currentPage > 1 ? (
                            <button className="rounded" style={{ color: "white", background: "#4e73df", fontSize: "20px", paddingTop: "0px", paddingBottom: "0px", paddingLeft: "9px", paddingRight: "9px", margin: "2px" }} onClick={() => handlePage(pagination.currentPage - 1)}>
                              Prev
                            </button>
                          ) : (
                            <button className="rounded" style={{ color: "white", background: "#4e73df", fontSize: "20px", paddingTop: "0px", paddingBottom: "0px", paddingLeft: "9px", paddingRight: "9px", margin: "2px", pointerEvents: "none", opacity: "0.5" }} disabled>
                              Prev
                            </button>
                          )}

                          {new Array(pagination.totalPage).fill().map((item, index) => (
                            <button className="rounded" style={{ background: index + 1 === currentPage ? "#e9e9e9" : "#4e73df", fontSize: "20px", paddingTop: "0px", paddingBottom: "0px", paddingLeft: "9px", paddingRight: "9px", margin: "2px" }} onClick={() => handlePage(index + 1)} key={index}>
                              {index + 1}
                            </button>
                          ))}

                          {pagination.currentPage < pagination.totalPage ? (
                            <button className="rounded" style={{ background: "#4e73df", fontSize: "20px", paddingTop: "0px", paddingBottom: "0px", paddingLeft: "9px", paddingRight: "9px", margin: "2px" }} onClick={() => handlePage(pagination.currentPage + 1)}>
                              Next
                            </button>
                          ) : (
                            <button className="rounded" style={{ background: "#4e73df", fontSize: "20px", paddingTop: "0px", paddingBottom: "0px", paddingLeft: "9px", paddingRight: "9px", margin: "2px", pointerEvents: "none", opacity: "0.5" }} disabled>
                              Next
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Daftar Pengajar Mengikuti Pelatihan</h1>
                  </div>
                  <table className="table table-striped" data-aos="zoom-in-down" data-aos-duration="2000">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nama Pengajar</th>
                        <th scope="col">Nama Pelatihan</th>
                        <th scope="col">Penugasan/Materi</th>
                        <th scope="col">Durasi Mengajar</th>
                        <th scope="col">Tanggal Mengajar</th>
                        <th scope="col">Waktu Absensi</th>
                        <th scope="col">Update Absensi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((item, index) => (
                          <tr key={item.id}>
                            <th>{index + 1}</th>
                            <td>{item.nama}</td>
                            <td>{item.nama_pelatihan}</td>
                            <td>{item.materi}</td>
                            <td>{item.durasi} Jam</td>
                            <td>{item.tanggal}</td>
                            <td>{item.created_at}</td>
                            <td>{item.updated_at}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </body>
  );
};

export default index;
