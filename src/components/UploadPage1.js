import { Form, Button, Checkbox, Input, ConfigProvider, Upload, Divider, InputNumber } from "antd";
import React from "react";
import "./UploadPage.css";

const UploadPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {/* Form.Item => input의 라벨테그 / ConfigProvider=> Theme 바꾸기*/}
      {/* onFinish =>submit 버튼을 누르고 데이터전송을 성공하면 */}
      <ConfigProvider
        theme={{
          token: { colorPrimary: "#ff0000" },
        }}
      >
        <Form name="upload" style={{ maxWidth: 600 }} onFinish={onFinish}>
          <Form.Item label="UserName" name="UserName" rules={[{ required: true, message: "필수입력 속성입니다." }]}>
            <Input />
          </Form.Item>
          <Form.Item label="UserPassword" name="UserPassword" rules={[{ required: true, message: "필수입력 속성입니다." }]}>
            <Input.Password />
          </Form.Item>
          {/*           <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              //offset: 8,
              span: 16,
            }}
          >
            <Checkbox>name, password 저장하기</Checkbox>
          </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              전송하기
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </>
  );
};
export default UploadPage;
