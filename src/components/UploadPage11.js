import { Form, Button, Input, Divider, InputNumber, Upload } from "antd";
import React, { useState } from "react";
import "./UploadPage.css";

const UploadPage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const onFinish = (val) => {
    console.log(val);
  };
  const onChangeImage = (info) => {
    console.log(info);
    if (info.file.status === "uploading") {
      return;
    } else if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };

  //usestate 에 imageUrl,setImageUrl 을 키로 넣고 처음에는 null을 할당

  return (
    <div id="upload-container">
      <Form name="uploadForm" onFinish={onFinish}>
        <Form.Item name="upload">
          <Upload
            name="image"
            action="http://localhost:8080/image"
            listType="picture"
            showUploadList={false}
            onChange={function () {
              onChangeImage;
            }}
          >
            {imageUrl ? (
              <img id="upload-img" src={`http://localhost:8080/${imageUrl}`} />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" />
                <span>이미지를 업로드해주세요.</span>
              </div>
            )}
            >
          </Upload>
          <div id="upload-img">
            <img src="/images/icons/camera.png" alt="" />
            <span>이미지를 업로드 해주세요.</span>
          </div>
        </Form.Item>

        <Form.Item name="upload">
          <Upload name="image" action="http://localhost:8080/image" listType="picture" showUploadList={false} onChange={function () {}}>
            <div id="upload-img-placeholder">
              <img src="/images/icons/camera.png" alt="" />
              <span>이미지를 업로드 해주세요</span>
            </div>
          </Upload>
        </Form.Item>
        {/* 경계선 */}
        <Divider />
        <Form.Item label={<span className="upload-label">상품명</span>} name="product-name" rules={[{ required: true, message: "상품명은 필수 입력 사항입니다." }]}>
          <Input className="upload-name" placeholder="상품명을 입력해주세요" size="large" />
        </Form.Item>
        <Divider />
        <Form.Item label={<span className="upload-price">판매가</span>} name="product-price" rules={[{ required: true, message: "판매가는 필수 입력 사항입니다." }]}>
          <InputNumber className="upload-price" size="large" min={0} defaultValue={0} />
        </Form.Item>
        <Divider />
        <Form.Item label={<span className="upload-label">상품설명</span>} name="product-description" rules={[{ required: true, message: "상품설명은 필수 입력 사항입니다." }]}>
          <TextArea size="large" id="product-description" showCount maxLength={300} placeholder="상품설명을 작성해주세요" />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" htmlType="submit">
            상품등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default UploadPage;
