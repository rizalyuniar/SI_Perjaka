import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/index";
import Sidebar from "../../Components/Sidebar/index";
import Footer from "../../Components/Footer/index";
import Card from "../../Components/Card/listPelatihan";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from "sweetalert2";
import style from "./style.module.css";

const index = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState();

  useEffect(() => {
    AOS.init();
  }, [])

  useEffect(() => {
    filterUser();
  }, [search]);

  const filterUser = (page) => {
    // Swal.fire({
    //   title: 'Loading...',
    //   allowOutsideClick: false,
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/menu?search=${search ? search : ""}&page=${page ? page : 1}`)
      .then((res) => {
        setMenu(res.data.data);
        setPagination(res.data.pagination);
        setLoading(false);
        Swal.close();
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Matikan loading jika terjadi kesalahan
        Swal.close();
      })
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      filterUser(search, currentPage);
    }
  };

  const handlePage = (page) => {
    setCurrentPage(page);
    filterUser(page);
  };

  return (
    <body id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper">
          <div id="content">
            <Navbar handleSearchChange={handleSearchChange} handleSearchKeyDown={handleSearchKeyDown} searchQuery={search} />
            <div className="container vw-100">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">
                  Silahkan Pilih Pelatihan Anda
                </h1>
              </div>

              {loading ? (
                <div className={`${style.loader}`}>
                  <div className={`${style.loaderdot}`} />
                  <div className={`${style.loaderdot}`} />
                  <div className={`${style.loaderdot}`} />
                  <div className={`${style.loaderdot}`} />
                  <div className={`${style.loaderdot}`} />
                  <div className={`${style.loaderdot}`} />
                  <div className={`${style.loadertext}`} />
                </div>
              ) : (
                <div className="row">
                  {menu.map((item) => (
                    <div className="col-md-6 col-lg-4 col-12 mb-4" key={item.id} data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                      <Card title={item.nama} image={item.photo} to={`/pelatihan/${item.id}`} />
                    </div>
                  ))}
                </div>
              )}

              <div className="justify-content-center d-flex mt-2 mb-3">
                <div className="">
                  {pagination && (
                    <>
                      {pagination.currentPage > 1 ? (
                        <button className="rounded" style={{ color: "white", background: "#4e73df", fontSize: "20px", paddingTop: "0px", paddingBottom: "0px", paddingLeft: "9px", paddingRight: "9px", margin: "2px" }} onClick={() => handlePage(pagination.currentPage - 1)}>
                          Prev
                        </button>
                      ) : (
                        <button className="rounded" style={{ color: "white", background: "#4e73df", fontSize: "20px", paddingTop: "0px", paddingBottom: "0px", paddingLeft: "9px", paddingRight: "9px", margin: "2px", pointerEvents: "none", opacity: "0.5" }} disabled>
                          Prev
                        </button>
                      )}

                      {new Array(pagination.totalPage).fill().map((item, index) => (
                        <button className="rounded" style={{ background: "#4e73df", fontSize: "20px", paddingTop: "0px", paddingBottom: "0px", paddingLeft: "9px", paddingRight: "9px", margin: "2px" }} onClick={() => handlePage(index + 1)} key={index}>
                          {index + 1}
                        </button>
                      ))}

                      {pagination.currentPage < pagination.totalPage ? (
                        <button className="rounded" style={{ background: "#4e73df", fontSize: "20px", paddingTop: "0px", paddingBottom: "0px", paddingLeft: "9px", paddingRight: "9px", margin: "2px" }} onClick={() => handlePage(pagination.currentPage + 1)}>
                          Next
                        </button>
                      ) : (
                        <button className="rounded" style={{ background: "#4e73df", fontSize: "20px", paddingTop: "0px", paddingBottom: "0px", paddingLeft: "9px", paddingRight: "9px", margin: "2px", pointerEvents: "none", opacity: "0.5" }} disabled>
                          Next
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>


            </div>
            <Footer />
          </div>
        </div>
      </div>
    </body>
  );
};

export default index;
