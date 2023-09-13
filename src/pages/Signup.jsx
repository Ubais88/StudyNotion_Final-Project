import React from 'react'
import signupimg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"
import { useSelector } from "react-redux";

const Signup = () => {
  const {loading} = useSelector((state)=>state.auth);

  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      desc1="Build skills for today, tommorrow and beyond."
      desc2="Education to future-proof your carrer."
      image={signupimg}
      formtype="signup"
    />
  )
}

export default Signup



// export default Signup