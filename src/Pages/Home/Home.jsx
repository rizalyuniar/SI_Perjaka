import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/index";
import Navbar from "../../Components/Navbar/index";
import Profile from "../../Components/Card/profil";
import Footer from "../../Components/Footer/index";
import axios from "axios";
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import defaultPhoto from "../../assets/img/user.png"

const Home = () => {
  const router = useNavigate();
  const [pengajar, setPengajar] = useState([]);
  const [totaljam, setTotaljam] = useState([]);

  useEffect(() => {
    AOS.init();
  }, [])

  function profileUser() {
    if (pengajar.photo === 'user.png') {
      return [defaultPhoto];
    }
    return pengajar.photo;
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_ENDPOINT}/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setPengajar(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
        router("/login");
      })
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_ENDPOINT}/users/totaljam`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setTotaljam(res?.data?.data[0]);
      })
  }, []);

  const handleChange = (e) => {
    setPengajar({
      ...pengajar,
      [e.target.name]: e.target.value,
    });
    console.log(pengajar);
  };
  const handleUpload = (e) => {
    setPengajar((prev) => {
      return { ...prev, photo: e.target.files[0] };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let attr in pengajar) {
      formData.append(attr, pengajar[attr]);
    }

    const id = localStorage.getItem('id');

    axios.put(`http://localhost:8000/users/${id}`, formData, {
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
          Swal.fire({
            icon: 'success',
            title: `${res.data.message}`,
            text: 'You clicked the button!',
          });
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
    <body id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container vw-100">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Biodata Pengajar</h1>
                {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</a> */}
              </div>

              <div className="row">
                {/* profile card */}
                {/* {pengajar.map((item) =>( */}
                <div className="col-md-5 col-sm-12 col-12 mb-3" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                  <Profile
                    photo={`${profileUser()}`}
                    nama={pengajar.nama}
                    nip={pengajar.nip}
                    pangkat={pengajar.pangkat}
                    jabatan={pengajar.jabatan}
                    instansi={pengajar.instansi}
                    npwp={pengajar.npwp}
                    rekening={pengajar.rekening}
                    bank={pengajar.bank}
                    wi={pengajar.wi}
                    total_jam={totaljam.total_durasi}
                  />
                </div>
                {/* ))} */}
                {/* form biodata */}
                <div className="col-md-7 col-sm-12 col-12 mb-3" data-aos="fade-down-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title font-weight-bold">
                        Form Biodata Pengajar
                      </h5>
                      <p className="card-text">
                        Silahkan mengisi data diri anda secara lengkap terlebih dahulu sebelum anda mendaftar pelatihan
                      </p>
                      <hr />
                    </div>
                    <form style={{ padding: 15, paddingTop: 0 }} onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                          Nama
                        </label>
                        <input type="text" name="nama" value={pengajar.nama} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                          NIP
                        </label>
                        <input type="text" name="nip" value={pengajar.nip} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                          Pangkat/Golongan
                        </label>
                        <input type="text" name="pangkat" value={pengajar.pangkat} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                          Jabatan
                        </label>
                        <input type="text" name="jabatan" value={pengajar.jabatan} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                          Instansi
                        </label>
                        <input type="text" name="instansi" value={pengajar.instansi} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                          No. NPWP
                        </label>
                        <input type="text" name="npwp" value={pengajar.npwp} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                          No. Rek
                        </label>
                        <input type="text" name="rekening" value={pengajar.rekening} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                          Nama Bank
                        </label>
                        <input type="text" name="bank" value={pengajar.bank} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                      </div>
                      <div>
                        <label className="mr-2">Pilih WI:</label>
                        <select name="wi" value={pengajar.wi} onChange={handleChange}>
                          <option value="Internal">Internal</option>
                          <option value="Eksternal">Eksternal</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">
                          Upload Foto Profile
                        </label>
                        <input className="form-control" name="photo" onChange={handleUpload} type="file" id="formFile" />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Simpan
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </body>
  );
};

export default Home;
