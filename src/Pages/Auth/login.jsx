import React, { useState } from "react";
import background from "../../assets/img/bg.png";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/siperjaka_putih.png"
import style from "./style.module.css"

const login = () => {
  const router = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Logging in...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    axios
      .post(`${import.meta.env.VITE_API_ENDPOINT}/users/login`, login)
      .then((res) => {
        // console.log(res.data.data);
        Swal.close();
        if (res.data.message !== "login is successful") {
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

          const token = res.data.data.token;
          const id = res.data.data.id;
          const nama = res.data.data.nama;
          const role = res.data.data.role;
          const photo = res.data.data.photo;

          localStorage.setItem("token", token);
          localStorage.setItem("id", id);
          localStorage.setItem("nama", nama);
          localStorage.setItem("role", role);
          localStorage.setItem("photo", photo);

          router("/");
        }
      })
      .catch((err) => {
        // console.log(err.response.data);
        Swal.close();
        Swal.fire({
          icon: "error",
          title: `${err.response.data.message}`,
          text: "Something went wrong!",
        });
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
                <form onSubmit={handleLogin}>
                <h1 className="text-center">Login Akun SiPerjaka</h1>
                  <div className="mb-3 row">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email"
                      onChange={(e) =>
                        setLogin({ ...login, email: e.target.value })
                      }
                      placeholder="Email"
                      required
                      style={{ borderRadius: "10px", borderColor: "yellow", borderStyle: "solid", marginLeft: "10px", padding: "5px", maxWidth: "300px"}}
                    />
                    <div id="emailHelp" className="form-text text-danger">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      onChange={(e) =>
                        setLogin({ ...login, password: e.target.value })
                      }
                      placeholder="Password"
                      required
                      style={{ borderRadius: "10px", borderColor: "yellow", borderStyle: "solid", marginLeft: "10px", padding: "5px", maxWidth: "300px"}}
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
                  <button type="submit" className="btn btn-warning" style={{ width: "300px" }}>
                    Login
                  </button>
                  <div className="mt-3">
                    <h6>Anda belum memiliki akun SIPerjaka ? Silahkan <Link to="/register" className="text-white font-weight-bold">Register</Link> disini</h6>
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

export default login;
