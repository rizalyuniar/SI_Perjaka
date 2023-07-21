import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">SI Perjaka</div>
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
              <span>Total Jam Pengajar</span>
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
