import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/index";
import Sidebar from "../../Components/Sidebar/index";
import Footer from "../../Components/Footer/index";
import Card from "../../Components/Card/listPelatihan";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

const index = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/menu`)
      .then((res) => {
        setMenu(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <body id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper">
          <div id="content">
            <Navbar />
            <div className="container vw-100">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">
                  Silahkan Pilih Pelatihan Anda
                </h1>
              </div>
              <div className="row">
                {menu.map((item) => (
                  <div className="col-md-4 mb-4" key={item.id} data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                    <Card title={item.nama} image={item.photo} to={`/pelatihan/${item.id}`} />
                  </div>
                ))}
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
