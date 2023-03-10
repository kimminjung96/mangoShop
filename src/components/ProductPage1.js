import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductPage.css"

const ProductPage=()=>{
    const navigate = useNavigate();
    const {id} = useParams();
    const [product,setProduct] = useState(null);

    /**
     * 비동기는 마지막에 실행
     * return문 보다 나중에 실행되서 리턴문에는 데이터가 안들어 잇는것.
     * if문으로 다시 초기로 올라가는데 다시 내려올땐 데이터가 담겨있서서 null값이 아니라 데이터가 찍힌다.
     * ***/
    useEffect(() => {
        const url = `https://56e099ba-1adb-411a-b9a7-f41aa33f35e5.mock.pstmn.io/products/${id}`;
        axios
         //2. 서버와 비동기 통신을 하여 product에 data를 변경하는 로직이 있다.
          .get(url)
          .then((result) => {
            /* const product = result.data;
            setProduct(product); */
            setProduct(result.data)
            //console.log(setProduct); 
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      console.log(product);
    
      /* if 문이 없으면 아래의 return문이 바로 실행되서 null값이 찍힘 */
      if(product == null){
        //1. null 이 반환되므로 useEffect(axios)라인 실행
        return<>상품정보를 받고 있습니다.</>
      }
    //console.log(id);
    return(
        <>
        <h1>{product.name}</h1>
        <h2>{id}번재 상품 정보 입니다.</h2>
        <img src={`../${product.imageUrl}`}  alt=""/>
        <h2>{product.price}</h2>
        <h2>{product.seller}</h2>
        <h2>{product.desc}</h2>


        <button onClick={()=>{
             navigate("/");
        }}>Home</button>
        </>
    )
}
export default ProductPage;