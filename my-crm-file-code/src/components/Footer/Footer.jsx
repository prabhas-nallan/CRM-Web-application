import React from 'react'
import './Footer.css'
import facebook from '../../assets/facebook.jpg'
import instagram from '../../assets/insta.jpg'
import twitter from '../../assets/twitter.jpg'
const Footer = () => {
  return (
    <div className='footer'>
      <a href="https://www.facebook.com" target="_blank">
        <img src={facebook} alt="facebook"/>
      </a>
      <a href="https://www.twitter.com" target="_blank">
        <img src={twitter} alt="twitter"/>
      </a>
      <a href="https://www.instagram.com" target="_blank">
        <img src={instagram} alt="instagram"/>
      </a>
    </div>
  )
}

export default Footer
