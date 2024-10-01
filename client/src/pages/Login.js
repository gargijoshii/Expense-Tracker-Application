import React, { useEffect } from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useState } from "react";

function Login() {
  const [loading, setLoading] = useState(false)
const navigate = useNavigate()
  const onFinish = async(values) => {
    try{
      setLoading(true)
      const response = await axios.post('/api/users/login',values)
      localStorage.setItem('spendwise-user',JSON.stringify({...response.data, password:''}));
      setLoading(false)
      message.success('User Logged In Successfully')
      navigate('/')

    }
    catch(error){
      message.error('Login Failed')
      
    }
  };

  useEffect(() => {
    if(localStorage.getItem('spendwise-user')){
      navigate('/')
    }
  }, [])
  

  return (
    <div className="register">
    {loading && <Spinner/>}
    
      <div className="row justify-content-center align-items-center w-100 h-100">
        
        </div>
        <div className="col-md-4">
          <Form layout="vertical" onFinish= {onFinish}>
          <h1>LOGIN</h1>
          
        

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
            <Input type ='password'/>
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register"> Not Registered Yet, Click Here To Register</Link>
              <button className="secondary" type = "submit">LOGIN</button>
            </div>
          </Form>
        </div>
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
    </div>
  );
}

export default Login;
