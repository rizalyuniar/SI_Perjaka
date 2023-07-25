import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SI from "../../assets/img/newlogo.png"

const index = () => {
  const role = localStorage.getItem("role");

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Logo */}
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/"
      >
        <div className="sidebar-brand-icon">
          <img src={SI} alt="" style={{ width: "200px", height: "50px"}} />
        </div>
        {/* <div className="row">
          <div className="sidebar-brand-text">SI Perjaka</div>
          <div className="" style={{ fontSize: "6px", color: "black"}}>Sistem Informasi Perhitungan Jam Akumulatif Ajar</div>
        </div> */}
          
      </Link>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to="/dashboard">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span>
        </Link>
      </li>
      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Pengajar</div>
      <li className="nav-item">
        <Link className="nav-link" to="/listpelatihan">
          <i className="fas fa-fw fa-folder" />
          <span>Mendaftar Pelatihan</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/listpengajar">
          <i className="fas fa-fw fa-table" />
          <span>List Pengajar</span>
        </Link>
      </li>
      <hr className="sidebar-divider" />
      {/* Admin */}
      {role === "admin" ? (
        <>
          <div className="sidebar-heading">Admin</div>
          <li className="nav-item">
            <Link className="nav-link" to="/jampelatihan">
              <i className="fas fa-fw fa-folder" />
              <span>Management Pengajar</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/buatpelatihan">
              <i className="fas fa-fw fa-table" />
              <span>Buat Menu Pelatihan</span>
            </Link>
          </li>
          <hr className="sidebar-divider" />
        </>
      ) : (
        <></>
      )}
    </ul>
  );
};

export default index;
