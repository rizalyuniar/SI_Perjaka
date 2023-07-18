import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";

const verif = () => {
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
