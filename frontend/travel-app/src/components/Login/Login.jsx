import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import s from "../../allcss/login.module.css"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Form from 'react-bootstrap/Form';

export default function Login() {
  let navigate = useNavigate();
  const [eyes, setEye] = useState(true)
  const [newUser, SetNewUser] = useState({
    email: null,
    password: null
  })

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData)
      console.log("Success!", response.data)
      setSuccessMessage("Login Successful!")
      localStorage.setItem('user', JSON.stringify(response.data))
      navigate("/")
    }
    catch (error) {
      console.log("Error during Login!", error.response?.data);
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach(field => {
          const errorMessages = error.response.data[field];
          if (errorMessages && errorMessages.length > 0) {
            setError(errorMessages[0]);
          }
        })
      }
    }
    finally {
      setIsLoading(false)
    }

  };

  return (
    <div className="container">
      <div className={s.login}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <h3>Login:</h3>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Напишите Email</Form.Label>
            <Form.Control required type="email"
              name="email"
              value={formData.email}
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Пароль</Form.Label>
            <Form.Control required type={eyes ? "password" : "text"}
              name="password"
              value={formData.password}
              onChange={handleChange} />
            {
              eyes ? (<span className={s.eye} onClick={() => (setEye(false))}>
                <FaEye />
              </span>) :
                (
                  <span className={s.eye} onClick={() => (setEye(true))}>
                    <FaEyeSlash />
                  </span>
                )
            }
          </Form.Group>
          <button type="submit" className='m-3' disabled={isLoading} onClick={handleSubmit}>
            Войти
          </button>
          <Link to='/register' className='m-3' >Зарегистрироваться</Link>
        </Form>
      </div>
    </div>

  )
}
