import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const VerifyEmail = () => {
    const {loading} = useSelector((state) => state.auth());

  return (
    <div>
        {
            loading ? (
                <div>Loading ...</div>
            ) : (
                <div>
                    <h1>Verify Email</h1>
                    <p>A Verification code has been sent to you. Enter the code below </p>
                    <form>
                        
                    </form>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail