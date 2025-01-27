import axios from "axios";

// crear una funcion de retorno de respuesta

// login

 const registerUser = async (user) => {
    
    const response = await axios.post(
      "https://grumpy-heads-cheat.loca.lt/api/users/register",
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
};

  const loginUser = async (user) => {
//  const loginUser = async ({email, password}) => {
    // console.log("api",user);
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

export default { loginUser, registerUser };