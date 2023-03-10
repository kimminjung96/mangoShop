import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import axios from "axios";
//라우팅 : 네트워크에서 경로를 연결하는 것
//https://sangchul.kr/100 SPA와 MPA의 장단점 비교

const MainPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = "https://56e099ba-1adb-411a-b9a7-f41aa33f35e5.mock.pstmn.io/products/";

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
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" alt="banner" />
        </div>
        <h1>Products</h1>
        <div id="product-list">
          {products.map((product, idx) => {
            console.log(`product: ${product.name} idx: ${idx}`);
            /* 포스트맨에는 id 키 값이 없음. idx는 map의 일련번호(태그번호) */
            return (
              <div className="product-card" key={idx}>
                <Link className="product-link" to={`/productPage/${product.id}`}>{/* products =>API(db)의 products경로 */}
                  <div>
                    <img src={product.imageUrl} className="product-img" alt={product.name} />
                  </div>
                  <div className="product-contents">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price}</span>
                    <span className="product-seller">
                      <img src="images/icons/avatar.png" className="product-avatar" alt={product.seller} />
                      <span>{product.seller}</span>
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default MainPage;
