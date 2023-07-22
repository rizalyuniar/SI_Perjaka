import React from 'react'
import Foto from '../../assets/img/foto.jpg'

const index = ({nama, nip, pangkat, jabatan, instansi, npwp, rekening, bank, wi, photo, total_jam}) => {
    return (
        <div className="card text-center shadow" style={{ border: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
            <div className="align-items-center mt-1">
                <img src={photo} style={{ width: 220, height: 220, borderRadius: "50%", backgroundColor: "white", border: "10px solid #4e73df", }} className="card-img-top mt-2" alt="..." />
            </div>
            <div className="card-body">
                <h3 className="card-title font-weight-bold">
                    {nama}
                </h3>
                <p className="card-text font-weight-bold">
                    NIP. {nip}
                </p>
            </div>
            <hr className="mb-1 mt-1" />
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Pangkat/Gol. {pangkat}</li>
                <li className="list-group-item">{jabatan}</li>
                <li className="list-group-item">{instansi}</li>
                <li className="list-group-item">No. NPWP {npwp}</li>
                <li className="list-group-item">No. Rek {rekening}</li>
                <li className="list-group-item">Bank {bank}</li>
                <li className="list-group-item">WI: {wi}</li>
                <li className="list-group-item font-weight-bold">Total Durasi Mengajar Anda {total_jam} Jam</li>
            </ul>
            <div className="card-body">
                {/* <a href="#" className="card-link">link</a><a href="#" className="card-link">link</a> */}
            </div>
        </div>
    )
}

export default index