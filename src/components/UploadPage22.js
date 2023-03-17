import React, { useState } from "react";
import "./UploadPage.css";
import { Button, Form, Input, Upload, Divider, InputNumber } from "antd";
// ConfigProvider : 환경설정하는 저장소
const { TextArea } = Input;

const UploadPage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const onFinish = (val) => {
    console.log(val);
  };
  const onChangeImage = (info) => {
    console.log(info);
    if (info.file.status === "uploading") {
      return;
    } if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };
  return (
    <div id="upload-container">
      <Form name="uploadForm" onFinish={onFinish}>
        <Form.Item name="upload">
          {/* key가 name //image라고 서버에 저장되있음  */}
          <Upload name="image" action="http://localhost:8080/image" listType="picture" showUploadList={false} onChange={onChangeImage}>
            {imageUrl ? (
              <img id="upload-img" src={`http://localhost:8080/uploads/${imageUrl}`} alt="" />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" alt="" />
                <span>이상한 이미지를 업로드 해주세요</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider />
        {/* Divider : 구분선 생성 */}
        <Form.Item label={<span className="upload-label">상품명 뭐게?</span>} name="product-name" rules={[{ required: true, message: "상품명은 필수 입력사항입니다." }]}>
          <Input className="upload-name" placeholder="상품명을 입력해주세요" size="large" />
        </Form.Item>
        <Divider />
        <Form.Item label={<span className="upload-price">판매가 얼마냐</span>} name="product-price" rules={[{ required: true, message: "판매가는 필수 입력사항입니다." }]}>
          <InputNumber className="upload-price" min={1} defaultValue={0} />
        </Form.Item>
        <Divider />
        <Form.Item label={<div className="upload-label">상품설명 안할꺼임</div>} name="product-description" rules={[{ required: true, message: "상품설명은 필수 입력사항입니다." }]}>
          {/* <Input.TextArea/> 해당 방식으로도 가능, 아래방식으로도 가능*/}
          <TextArea size="large" id="product-description" showCount maxLength={300} placeholder="상품설명을 작성해주세요" />
          {/* const {TextArea} = Input; 이렇게도 사용가능 */}
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
