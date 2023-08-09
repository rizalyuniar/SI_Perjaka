import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/index";
import Navbar from "../../Components/Navbar/index";
import Footer from "../../Components/Footer/index";
import Jam from "../../Components/ModalEdit/totalJam";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

const index = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        AOS.init();
        filterPengajar(search, currentPage);
    }, []);

    const filterPengajar = (key, page) => {
        Swal.fire({
            title: "Loading... <br> Memuat Data",
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        axios
            .get(
                `${import.meta.env.VITE_API_ENDPOINT}/users?search=${search ? search : ""
                }&page=${page ? page : 1}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((res) => {
                setLoading(false);
                Swal.close();
                setData(res?.data?.data);
                setPagination(res.data.pagination);
                // console.log(res?.data?.data);
            })
            .catch((err) => {
                setLoading(false);
                Swal.close();
                console.log(err);
            });
    };

    const handleSearch = async (e) => {
        if (e.key === "Enter") {
            setCurrentPage(1);
            filterPengajar(search, currentPage);
        }
    };
    const handlePage = (page) => {
        setCurrentPage(page);
        filterPengajar(search, page);
    };

    return (
        <body id="page-top">
            <div id="wrapper">
                <Sidebar />
                <div className="d-flex flex-column">
                    <div id="content">
                        <Navbar />
                        <div className="container vw-100">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">
                                    Biodata Seluruh Akun Pengajar
                                </h1>
                            </div>
                            <table
                                className="table table-striped"
                                data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000"
                            >
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
                                        <th scope="col">Bank</th>
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
                                                <td>{item.bank}</td>
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
                                                        rekening={item.rekening}
                                                        bank={item.bank}
                                                        wi={item.wi}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
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
                                                <button className="rounded" style={{ background: index + 1 === currentPage ? "#e9e9e9" : "#4e73df", fontSize: "20px", paddingTop: "0px", paddingBottom: "0px", paddingLeft: "9px", paddingRight: "9px", margin: "2px" }} onClick={() => handlePage(index + 1)} key={index}>
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
