import React from 'react'

export default function List(props) {
  const { children, className } = props
  return <div className={className}>{children}</div>
}
