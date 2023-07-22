import React, { useState } from "react";
import background from "../../assets/img/bg.png";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const login = () => {
    const router = useNavigate();
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const handleLogin = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Logging in...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        axios.post(`${import.meta.env.VITE_API_ENDPOINT}/users/login`, login)
            .then((res) => {
                // console.log(res.data.data);
                Swal.close();
                if (res.data.message !== 'login is successful') {
                    Swal.fire({
                        icon: 'error',
                        title: `${res.data.message}`,
                        text: 'Something went wrong!',
                    });
                } else {
                    Swal.fire(`${res.data.message}`, 'You clicked the button!', 'success');

                    const token = res.data.data.token;
                    const id = res.data.data.id;
                    const nama = res.data.data.nama;
                    const role = res.data.data.role;
                    const photo = res.data.data.photo;

                    localStorage.setItem('token', token);
                    localStorage.setItem('id', id);
                    localStorage.setItem('nama', nama);
                    localStorage.setItem('role', role);
                    localStorage.setItem('photo', photo);

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
    }

    return (
        <body id="">
            <div id="" className="vh-100">
                <div className="container-fluid row">
                    {/* <div className="col-md-6">
                        <img src={background} className="card-img-top" alt="..." style={{ height: "657px" }} />
                    </div> */}
                    <div className="col-md-6">
                        <div className="card mt-5" style={{ width: "670px" }}>
                            <div className="card-body">
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Email address
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            onChange={(e) => setLogin({ ...login, email: e.target.value })}
                                            placeholder="Email"
                                            required
                                        />
                                        <div id="emailHelp" className="form-text">
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
                                            onChange={(e) => setLogin({ ...login, password: e.target.value })}
                                            placeholder="Password"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">
                                            Check me out
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </body>
    );
};

export default login;
