import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductPage.css";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const url = `http://localhost:8080/products?id=${id}`;
    axios
      .get(url)
      .then((result) => {
        setProduct(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(product);

  if (product == null) {
    return <>상품정보를 받고 있습니다.</>;
  }
  return (
    <>
      <button
        onClick={() => {
          navigate(-1);
        }}
        id="back-btn"
      >
        Home
      </button>
      {/* / =>root 최상위에 있는 모든 걸 불러오는??읽어오는 (App.js 에 있는 /root 경로)*/}
      <div id="image-box">
        <img src={`/${product.imageUrl}`} alt={product.name} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" alt={product.seller} />
        <span>{product.seller}</span>
      </div>
      <div>
        <div id="name">{product.name}</div>
        <div id="price">{product.price}</div>
        <div id="crateAt">2023.03.10</div>
        <div id="description">{product.desc}</div>
      </div>
    </>
  );
};
export default ProductPage;
