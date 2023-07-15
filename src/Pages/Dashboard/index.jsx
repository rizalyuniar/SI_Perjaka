import React from 'react'
import Navbar from '../../Components/Navbar/index'
import Sidebar from '../../Components/Sidebar/index'
import Footer from '../../Components/Footer/index'
import "../../assets/css/sb-admin-2.min.css"
import "../../assets/css/sb-admin-2.css"
import Chart from '../../Components/Dashboard/chartPertama'
import Chart2 from '../../Components/Dashboard/chartKedua'
import Chart3 from '../../Components/Dashboard/chartKetiga'

const index = () => {
    return (
        <body id="page-top">
            <div id="wrapper">
                <Sidebar />
                <div className="d-flex flex-column">
                    <div id="content">
                        <Navbar />
                        <div className="container vw-100 ">                
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-3 col-sm-12 col-12 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Jumlah Pengajar</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">40</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 col-sm-12 col-12 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Jumlah Pelatihan</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">20</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 col-sm-12 col-12 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Total Jam Mengajar</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="col-md-3 col-sm-12 col-12 mb-4">
                                    <div className="card border-left-info shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        Data 4</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <h5>Jumlah Pengajar</h5>
                                    <Chart />
                                </div>
                                <div className="col-md-6">
                                    <h5>Jumlah Pelatihan</h5>
                                    <Chart2 />
                                </div>
                                <div className="col-md-12">
                                    <h5>Total Jam Mengajar</h5>
                                    <Chart3 />
                                </div>
                            </div>

                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </body>
    )
}

export default index