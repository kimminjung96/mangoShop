import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import { API_URL } from "../config/constants";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Carousel } from "antd";
//라우팅 : 네트워크에서 경로를 연결하는 것
//https://sangchul.kr/100 SPA와 MPA의 장단점 비교

dayjs.extend(relativeTime);

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    //여기는 products통신
    const url = `${API_URL}/products`;

    /* axios는 비동기이고 비동기는 return안됌 */
    axios
      .get(url)
      .then((result) => {
        //console.log("result", result);
        const products = result.data.product; //배열로 데이터가 들어옴
        /* 
        db get(/products)부분을 보면
         res.send({
        product: result, =>여기서 product로 보내기 때문에 product로 받아야 함
      });
        */
        setProducts(result.data.product);
        //리엑트는 값을 직접적으로 바로 바꿀 수 없음. 그래서 값을 바꿀 때 는 useState()를 써줘야 하는 거임
        //console.log(products); //값있음
      })
      .catch((error) => {
        console.log(error);
      });

    //여기는 banner통신
    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        const banners = result.data.banners;
        setBanners(result.data.banners);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); //mount되는 시점

  //console.log(products); //빈배열
  return (
    <>
      <div id="body">
        <Carousel autoplay>
          {banners.map((banner, idx) => {
            return (
              <Link to={banner.href} key={idx}>
                <div id="banner">
                  <img src={`${API_URL}/${banner.imageUrl}`} alt="" />
                </div>
              </Link>
            );
          })}
        </Carousel>
        <h1>Products</h1>
        <div id="product-list">
          {products.map((product, idx) => {
            //console.log(`product: ${product.name} idx: ${idx}`);
            console.log(product);
            /* 포스트맨에는 id 키 값이 없음. idx는 map의 일련번호(태그번호) */
            return (
              <>
                <div className="product-card" key={idx}>
                  {product.soldout == 1 ? (
                    <div className="product-blur"></div>
                  ) : null}

                  <Link
                    className="product-link"
                    to={`/productPage/${product.id}`}
                  >
                    {/* products =>API(db)의 products경로 */}
                    <div>
                      <img
                        src={`${API_URL}/${product.imageUrl}`}
                        className="product-img"
                        alt={product.name}
                      />
                    </div>
                    <div className="product-contents">
                      <span className="product-name">{product.name}</span>
                      <span className="product-price">{product.price}</span>
                      <div className="product-footer">
                        <span className="product-seller">
                          <img
                            src="images/icons/avatar.png"
                            className="product-avatar"
                            alt={product.seller}
                          />
                          <span>{product.seller}</span>
                        </span>
                        <span className="product-date">
                          {dayjs(product.createdAt).format(
                            "YY년MM월DD일 - A hh시"
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default MainPage;
