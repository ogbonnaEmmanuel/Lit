import React from 'react'
import hero_image from './hero_image.png'
import './hero.css'

class Hero extends React.Component{
    render(){
        return(
            <div className="hero">
                <p id="hero_text">EASILY SHORTEN YOUR LINKS</p>
                <img src={hero_image} alt="url shortener" id="hero_img"/>
            </div>
        )
    }
}
export default Hero

