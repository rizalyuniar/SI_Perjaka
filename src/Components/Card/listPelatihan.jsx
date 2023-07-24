import React from "react";
import { Link } from "react-router-dom";
import defaultPhoto from "../../assets/img/pelatihan.png"

const listPelatihan = ({ title, image, to }) => {
    function imagePelatihan() {
        if (image === 'menu.png') {
          return [defaultPhoto];
        }
        return image;
    }

  return (
    <div className="card shadow" style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
      <img className="card-img-top" src={`${imagePelatihan()}`} alt="Card image cap" style={{ height: "150px" }} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <Link to={to} className="btn" style={{ color: "#fff", background: "#4e73df", borderRadius: "20px" }}>
          Daftar Pelatihan
        </Link>
      </div>
    </div>
  );
};

export default listPelatihan;
