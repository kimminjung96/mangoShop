import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductPage.css";
import dayjs from "dayjs";
import { API_URL } from "../config/constants";
import { Button, message } from "antd";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProuct = () => {
    const url = `${API_URL}/products/${id}`;
    axios
      .get(url)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProuct();
  }, []);
  console.log(product);

  if (product == null) {
    return <>상품정보를 받고 있습니다.</>;
  }
  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("dfsdfs");
        getProuct();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" alt={product.seller} />
        <span>{product.seller}</span>
      </div>
      <div className="content-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}</div>
        {/* <div id="crateAt">{dayjs(product.createdAt).fromNow()}</div> */}
        <div id="crateAt">{dayjs(product.createdAt).format("YYYY.MM.DD : HH시MM분ss초")}</div>
        <Button size="large" type="primary" danger={true} className="payment" onClick={onClickPurchase} disabled={product.soldout === 1}>
          즉시결제하기
        </Button>
        <pre id="description">{product.description}</pre>
      </div>
    </>
  );
};
export default ProductPage;
