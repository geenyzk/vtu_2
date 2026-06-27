import React, { type ButtonHTMLAttributes } from 'react'


interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?:React.ReactNode
}
const Button = (props: Button) => {
  return (
    <div className="btn">{props?.children}</div>
  )
}

export default Button