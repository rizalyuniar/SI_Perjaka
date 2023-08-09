import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const cetakAdmin = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_ENDPOINT}/pelatihan/cetak`)
      .then((res) => {
        setData(res?.data?.data);
        // console.log(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const exportToExcel = async () => {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Sheet1');

    // Set header row
    ws.addRow([
      '#', 'NPWP', 'Gol/Pangkat', 'Tanggal Mengajar', 'Nama',
      'Penugasan/Materi', 'Pelatihan', 'Durasi Mengajar', 'Rekening', 'Nama Bank'
    ]);

    // Add data rows
    data.forEach((item, index) => {
      ws.addRow([
        index + 1, item.npwp, item.pangkat, item.tanggal, item.nama,
        item.materi, item.nama_pelatihan, item.durasi, item.rekening, item.bank
      ]);
    });

    const blob = await wb.xlsx.writeBuffer();

    saveAs(new Blob([blob]), 'all_data_pengajar.xlsx');
  };

  return (
    <div className="container-fluid vw-100">
      <div className="">
        <div className="row">
          <button className="btn btn-primary" onClick={exportToExcel}>
            Cetak Excel
          </button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NPWP</th>
                <th scope="col">Gol/Pangkat</th>
                <th scope="col">Tanggal Mengajar</th>
                <th scope="col">Nama</th>
                <th scope="col">Penugasan/Materi</th>
                <th scope="col">Pelatihan</th>
                <th scope="col">Durasi Mengajar</th>
                <th scope="col">Rekening</th>
                <th scope="col">Nama Bank</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item, index) => (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>{item.npwp}</td>
                  <td>{item.pangkat}</td>
                  <td>{item.tanggal}</td>
                  <td>{item.nama}</td>
                  <td>{item.materi}</td>
                  <td>{item.nama_pelatihan}</td>
                  <td>{item.durasi}</td>
                  <td>{item.rekening}</td>
                  <td>{item.bank}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default cetakAdmin