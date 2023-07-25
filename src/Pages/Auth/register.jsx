import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/img/siperjaka_putih.png"
import style from "./style.module.css"

const register = () => {
  const router = useNavigate();
  const [register, setRegister] = useState({
    nama: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    axios
      .post(`${import.meta.env.VITE_API_ENDPOINT}/users/registerVerif`, register)
      .then((res) => {
        setIsLoading(false);
        Swal.close();
        // console.log(res.data.message);
        if (res.data.message !== "Check your email") {
          Swal.fire({
            icon: "error",
            title: `${res.data.message}`,
            text: "Something went wrong!",
          });
        } else {
          Swal.fire(
            `${res.data.message}`,
            "You clicked the button!",
            "success"
          );
          // router("/login");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.close();
        Swal.fire({
          icon: "error",
          title: `${err.response.message}`,
          text: "Something went wrong!",
        })
      });
  };

  return (
    <div className={`container-fluid vw-100 vh-100 ${style.bg}`}>
      <div className="">
        <div className="row justify-content-end">
          <div className="col-md-6 mt-5">
            <div className="card mt-5 shadow" style={{ width: "670px", background: "none" }}>
              <div className="card-body">
                {/* <img src={logo} alt="" style={{ width: "600px"}} /> */}
                <form onSubmit={handleSubmit}>
                  <h1 className="text-center">Registrasi Akun SiPerjaka</h1>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Nama
                    </label>
                    <input
                      type="text"
                      name="nama"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => setRegister({ ...register, nama: e.target.value })}
                      style={{ borderRadius: "10px", borderColor: "yellow", borderStyle: "solid", padding: "5px", maxWidth: "300px" }}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => setRegister({ ...register, email: e.target.value })}
                      style={{ borderRadius: "10px", borderColor: "yellow", borderStyle: "solid", padding: "5px", maxWidth: "300px" }}
                      required
                    />
                    <div id="emailHelp" className="form-text text-danger">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      onChange={(e) => setRegister({ ...register, password: e.target.value })}
                      style={{ borderRadius: "10px", borderColor: "yellow", borderStyle: "solid", padding: "5px", maxWidth: "300px" }}
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Check me out
                    </label>
                  </div>
                  <button type="submit" className="btn btn-warning" disabled={isLoading} style={{ width: "300px" }}>
                    Register
                  </button>
                  <div className="mt-3">
                    <h6>Anda sudah memiliki akun SIPerjaka ? Silahkan <Link to="/login" className="text-white font-weight-bold">Login</Link> disini</h6>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default register;
