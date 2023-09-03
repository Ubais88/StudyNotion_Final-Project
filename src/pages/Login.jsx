import React from 'react'
import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

const Login = () => {
  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tommorrow and beyond."
      desc2="Education to future-proof your carrer."
      image={loginImg}
      formtype="login"
    />
  )
}

export default Login