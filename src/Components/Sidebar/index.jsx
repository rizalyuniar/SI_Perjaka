import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const index = () => {
  const [menu, setMenu] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    axios
      .get(`http://localhost:8000/menu`)
      .then((res) => {
        setMenu(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
      {/* Pengajar */}
      <div className="sidebar-heading">Pelatihan</div>
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-fw fa-folder" />
          <span>Mendaftar Pelatihan</span>
        </a>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Pilih Pelatihan Anda:</h6>
            {menu.map((item) => (
              <Link
                className="collapse-item"
                to={`/pelatihan/${item.id}`}
                key={item.id}
              >
                {item.nama}
              </Link>
            ))}
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/listpengajar">
          <i className="fas fa-fw fa-table" />
          <span>List Pengajar</span>
        </Link>
      </li>
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">Kebutuhan</div>
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseCetak"
          aria-expanded="true"
          aria-controls="collapsePages"
        >
          <i className="fas fa-fw fa-folder" />
          <span>Cetak</span>
        </a>
        <div
          id="collapseCetak"
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Cetak Admin:</h6>
            <a className="collapse-item" href="#">
              Laporan 1
            </a>
            <a className="collapse-item" href="#">
              laporan 2
            </a>
            <div className="collapse-divider" />
            <h6 className="collapse-header">Cetak Pengajar:</h6>
            <a className="collapse-item" href="#">
              Laporan 1
            </a>
            <a className="collapse-item" href="#">
              Laporan 2
            </a>
          </div>
        </div>
      </li>

      {role === "pengajar" ? (
        <>
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseAdmin"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i className="fas fa-fw fa-folder" />
              <span>Admin</span>
            </a>
            <div
              id="collapseAdmin"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Kebutuhan Admin:</h6>
                <Link className="collapse-item" to="/jampelatihan">
                  Total Jam Pengajar
                </Link>
                <Link className="collapse-item" to="/buatpelatihan">
                  Buat Menu Pelatihan
                </Link>
              </div>
            </div>
          </li>
        </>
      ) : (
        <></>
      )}

      {/* <hr className="sidebar-divider d-none d-md-block" /> */}
      {/* Sidebar Toggler (Sidebar) */}
      {/* <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" />
                </div> */}
    </ul>
  );
};

export default index;
