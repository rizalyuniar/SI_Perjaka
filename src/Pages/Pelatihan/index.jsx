import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/index'
import Navbar from '../../Components/Navbar/index'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import Pelatihan from '../../Components/Table/pelatihan'
import AOS from 'aos'
import 'aos/dist/aos.css'

const index = () => {
  const { id } = useParams();
  const [pelatihan, setPelatihan] = useState([]);
  const [form, setForm] = useState({
    materi: "",
    durasi: "",
    tanggal: "",
  });

  useEffect(() => {
    AOS.init();
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:8000/menu/${id}`)
      .then((res) => {
        setPelatihan(res?.data?.data?.[0]);
      })
      .catch((err) => console.log(err));
  }, [])

  const handleChange = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:8000/pelatihan/${id}`, form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.data.message !== "Pelatihan created") {
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
    <body id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container vw-100">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Mendaftar Pelatihan {pelatihan.nama}</h1>
              </div>
              {pelatihan.photo !== "menu.png" ? (
                <>
                  <div className="mb-3" data-aos="fade-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                    <img src={pelatihan.photo} style={{ maxHeight: "220px", width: "520px", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}></img>
                  </div>
                </>
              ) : (
                <></>
              )}
              <div>
                <div className="card" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine" data-aos-duration="2000">
                  <div className="card-header">
                    Silahkan daftar sesuai pelatihan anda dengan benar
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleChange}>
                      <div className="d-flex">
                        <div className="form-group mx-3">
                          <label htmlFor="formGroupExampleInput">Nama Pelatihan</label>
                          <input
                            type="readonly"
                            value={pelatihan.nama}
                            className="form-control"
                            id="formGroupExampleInput"
                          />
                        </div>
                        <div className="form-group mx-3">
                          <label htmlFor="formGroupExampleInput2">Penugasan/Materi</label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput2"
                            onChange={(e) => setForm({ ...form, materi: e.target.value })}
                          />
                        </div>
                        <div className="form-group mx-3">
                          <label htmlFor="formGroupExampleInput2">Durasi Mengajar</label>
                          <input
                            type="number"
                            className="form-control"
                            id="formGroupExampleInput2"
                            onChange={(e) => setForm({ ...form, durasi: e.target.value })}
                          />
                        </div>
                        <div className="form-group mx-3">
                          <label htmlFor="formGroupExampleInput2">Tanggal Mengajar</label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput2"
                            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
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

              <div className="mt-5" data-aos="zoom-in-up" data-aos-anchor="#example-anchor" data-aos-offset="500" data-aos-duration="2000">
                <Pelatihan />
              </div>

            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default index