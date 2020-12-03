import React from "react";
import './about.css';
import happy_video from './happy.mp4'

class About extends React.Component {
    render() {
        return (
            <section id="about_wrapper">
                <div id="about_details">
                    <div id="vid_side">
                        <video src={happy_video} autoPlay={true} loop={true} id="vid"/>
                    </div>
                    <div id="text_side">
                        <p id="about_text">SHORTEN YOUR LINK FOR FREE</p>
                        <div id="feedback_side">
                            <p id="feedback_text">TO GET FEEDBACK ON YOUR LINKS PLEASE SIGN UP</p>
                            <div className="center_element">
                                <a href="/sign_up" id="feedback_btn">SIGN UP</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-shape-divider-bottom-1600592050">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                         preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,
                        14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,
                        31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                              className="shape-fill"/>
                    </svg>
                </div>
            </section>
        )
    }
}

export default About