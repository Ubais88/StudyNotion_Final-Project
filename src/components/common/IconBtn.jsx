import React from 'react'

const IconBtn = ({
        text, 
        onClick, 
        childern, 
        disabled, 
        outline=false,
        customClasses,
        type,
    }) => {

  return (
    <button
        disabled={disabled}
        onClick={onClick}
        type={type}    
    >
        {
            childern ? (
            <>
                <span>
                    {text}
                </span>
                {childern}
            </>
            ) : (text)
        }
    </button>
  )
}

export default IconBtn