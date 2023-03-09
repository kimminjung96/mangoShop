import React, { useEffect, useState } from "react";
import "./MainPage.css";
import axios from "axios";

const MainPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = "https://56e099ba-1adb-411a-b9a7-f41aa33f35e5.mock.pstmn.io/products";

    /* axios는 비동기이고 비동기는 return안됌 */
    axios
      .get(url)
      .then((result) => {
        const products = result.data.products; //배열로 데이터가 들어옴
        setProducts(products);
        //리엑트는 값을 직접적으로 바로 바꿀 수 없음. 그래서 값을 바꿀 때 는 useState()를 써줘야 하는 거임
        console.log(products); //값있음
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); //mount되는 시점

  console.log(products); //빈배열
  return (
    <>
      <div id="header">
        <div id="header-area">
          <img src="images/icons/logo.png" alt="logo" />
        </div>
      </div>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" alt="banner" />
        </div>
        <h1>Products</h1>
        <div id="product-list">
          {products.map((product,idx) => {
            console.log(`product: ${product.name} idx: ${idx}`);
            return (
              <div className="product-card" key={idx}>
                <div>
                  <img src={product.imageUrl} className="product-img" alt="" />
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}</span>
                  <span className="product-seller">
                    <img src="images/icons/avatar.png" className="product-avatar" alt="" />
                    <span>{product.seller}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="footer">
        <a href="#">회사소개</a>
        <a href="#">이용약관</a>
        <a href="#">통신판매업신고번호:123-1234</a>
        <a href="#">사업자등록번호:456-45-4567</a>
        <a href="#">고객센터:456-4567</a>
      </div>
    </>
  );
};
export default MainPage;
