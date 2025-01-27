import axios from "axios";
import React from 'react'
// crear una funcion de retorno de respuesta

// login

 const registerUser = async (user) => {
    
    const response = await axios.post(
      "http://127.0.0.1:8000/api/prueba",
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
};

//   const loginUser = async (user) => {
    const loginUser = async (values) => { const response = await axios.post('http://192.168.50.128:8000/api/login', values); return response.data; };

export default { loginUser, registerUser };