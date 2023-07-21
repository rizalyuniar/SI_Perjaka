import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import style from "./style.module.css";
import Swal from "sweetalert2";

const verif = () => {
  const [params, setParams] = useSearchParams();
  const token = params.get("token");
  const router = useNavigate();

  useEffect (() => {
    axios.get(`${import.meta.env.VITE_API_ENDPOINT}/users/verif/${token}`)
    .then((res) => {
      console.log(res.data.message);
      if (res.data.message !== "User created") {
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
      }
    })
    .catch((err) =>
      Swal.fire(
        `${err.response.data.message}`,
        "Silahkan melakukan register kembali!",
        "error",
        router("/register")
      )
    );
  })

  return (
    <div className="container-fluid vw-100">
      <div className="">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className={`${style.payment} shadow`}>
              <div className={style.payment_header}>
                <div className={style.check}>
                  <i className="fa fa-check" aria-hidden="true"></i>
                </div>
              </div>
              <div className={style.content}>
                <h1 className="font-weight-bold" style={{ fontSize: "40px" }}>
                  Verification Success!
                </h1>
                <p>
                  Thanks for keeping Stitch safe! <br /> if you questions you
                  can contact us any time by emailing.{" "}
                </p>
                <Link to="/login" className="text-decoration-none p-2 px-3">
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default verif;
