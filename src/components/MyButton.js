import React from 'react'

const MyButton = ({ text, type, onClick }) => {

  const buttonType = ['positive', 'negative'].includes(type) ? type: 'default';  
  return (
    <button className={ ["MyButton", `MyButton_${buttonType}`].join(" ") }  onClick={onClick}>
        {text}    
    </button>
  )
}

export default MyButton

