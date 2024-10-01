import React from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(true);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/users/register", values);
      message.success("User Registered Successfully");
      setLoading(false);
    } catch (error) {
      message.error("Something Went Wrong");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("spendwise-user")) {
      navigate("/");
    }
  }, []);
  
  return (
    <div className="register">
      {loading && <Spinner />}

      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://lottie.host/d3d99d37-14bb-4e69-ad21-62dd62352c76/w4ExBxdVRL.json"
              background="transparent"
              speed="1"
              loop
              autoplay
              direction="1"
              mode="normal"
            ></lottie-player>
          </div>
        </div>
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>REGISTER</h1>
          
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login"> Already Registered, Click Here To Login</Link>
              <button className="secondary" type="submit">
                REGISTER
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
