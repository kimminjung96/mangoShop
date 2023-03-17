import { API_URL } from "../config/constants"; //위에 선언하기
import { useState } from "react";
import "./UploadPage.css";

import { Form, Divider, Input, InputNumber, Button, Upload } from "antd";
import axios from "axios";
const { TextArea } = Input;

const UploadPage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const onFinish = (values) => {
    //console.log("이것은 벨류", values);
    //${API_URL}/products`이 경로로 값을 요청!
    axios.post(`${API_URL}/products`, {
      name: values.name,
      description: values.description,
      price: values.price,
      seller: values.seller,
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })
  };
  const onChageImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };

  return (
    <div id="body">
      <div id="load-container">
        <Form name="uploadForm" onFinish={onFinish}>
          <Form.Item name="upload" label={<div className="upload-label">상품 사진</div>}>
            <Upload name="image" action={`${API_URL}/image`} listType="picture" showUploadList={false} onChange={onChageImage}>
              {imageUrl ? (
                <img id="upload-img" src={`${API_URL}/${imageUrl}`} alt="" />
              ) : (
                <div id="upload-img-placeholder">
                  <img src="/images/icons/camera.png" alt="" />
                  <span>이미지업로드</span>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Divider />
          <Form.Item label={<div className="upload-label">판매자명</div>} name="seller" rules={[{ required: true, message: "판매자명을 입력해주세요" }]}>
            <Input className="upload-name" size="large" placeholder="판매자명을 입력해주세요" />
          </Form.Item>
          <Divider />
          <Form.Item label={<div className="upload-label">상품명</div>} rules={[{ required: true, message: "상품명을 입력해주세요" }]} name="name">
            <Input className="upload-name" size="large" placeholder="상품명을 입력해주세요" />
          </Form.Item>
          <Divider />
          <Form.Item label={<div className="upload-label">판매가</div>} rules={[{ required: true, message: "판매가를 입력해주세요" }]} name="price">
            <InputNumber className="upload-price" size="large" min={0} defaultValue={0} />
          </Form.Item>
          <Divider />
          <Form.Item label={<div className="upload-label">상품설명</div>} rules={[{ required: true, message: "상품설명을 입력해주세요" }]} name="description">
            <TextArea size="large" id="product-description" showCount maxLength={300} placeholder="상품설명을 입력해주세요" />
          </Form.Item>
          <Divider />
          <Form.Item>
            <Button id="submit-button" size="large" htmlType="submit">
              상품등록하기
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default UploadPage;
