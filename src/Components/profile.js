import React from 'react'
import '../Styles/Card.css'
export default function Profile({props}) {
  return (
    <div className='profile'>{props[0]}</div>
  )
}
