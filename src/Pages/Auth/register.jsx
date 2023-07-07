import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const register = () => {
  const router = useNavigate();
  const [register, setRegister] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8000/users/registerVerif`, register)
      .then((res) => {
        console.log(res.data.message);
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
          router("/login");
        }
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: `${err.response.message}`,
          text: "Something went wrong!",
        })
      );
  };

  return (
    <form onSubmit={handleSubmit}>
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
        />
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
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setRegister({ ...register, password: e.target.value })}
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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default register;
