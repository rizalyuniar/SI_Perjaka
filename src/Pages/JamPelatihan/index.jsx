import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/index";
import Navbar from "../../Components/Navbar/index";
import Footer from "../../Components/Footer/index";
import Jam from "../../Components/ModalEdit/totalJam";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const index = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        AOS.init();
      }, [])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_ENDPOINT}/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                setData(res?.data?.data);
                console.log(res?.data?.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <body id="page-top">
            <div id="wrapper">
                <Sidebar />
                <div className="d-flex flex-column">
                    <div id="content">
                        <Navbar />
                        <div className="container vw-100">
                            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 class="h3 mb-0 text-gray-800">Biodata Seluruh Akun Pengajar</h1>
                            </div>
                            <table className="table table-striped" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nama Pengajar</th>
                                        <th scope="col">Nip</th>
                                        <th scope="col">Pangkat</th>
                                        <th scope="col">jabatan</th>
                                        <th scope="col">Instansi</th>
                                        <th scope="col">NPWP</th>
                                        <th scope="col">Rekening</th>
                                        <th scope="col">WI</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data &&
                                        data.map((item, index) => (
                                            <tr key={item.id}>
                                                <th>{index + 1}</th>
                                                <td>{item.nama}</td>
                                                <td>{item.nip}</td>
                                                <td>{item.pangkat}</td>
                                                <td>{item.jabatan}</td>
                                                <td>{item.instansi}</td>
                                                <td>{item.npwp}</td>
                                                <td>{item.rekening}</td>
                                                <td>{item.wi}</td>
                                                <td>
                                                    <Jam
                                                        id={item.id}
                                                        nama={item.nama}
                                                        nip={item.nip}
                                                        pangkat={item.pangkat}
                                                        jabatan={item.jabatan}
                                                        instansi={item.instansi}
                                                        npwp={item.npwp}
                                                        rekeing={item.rekeing}
                                                        wi={item.wi}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </body>
    );
};

export default index;
