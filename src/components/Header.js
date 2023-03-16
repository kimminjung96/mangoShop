import React from "react";
import { Link  ,useNavigate  } from "react-router-dom";
import "./MainPage.css";
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Header = () => {
  let navigate = useNavigate();
  return (
    <div id="header">
      <div id="header-area">
        {/* / => 최상위폴더에서 부터 찾는다! */}
        <Link to="/">
          <img src="/images/icons/logo.png" alt="logo" />
        </Link>
        <Button
          icon={<UploadOutlined />}
          size="large"
          type="dashed"
          shape="round"
          onClick={() => {
            navigate("/UploadPage")
          }}
        >
          상품업로드
        </Button>
      </div>
    </div>
  );
};

export default Header;
