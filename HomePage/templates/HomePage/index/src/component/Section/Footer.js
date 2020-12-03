import React from 'react';
import './footer.css';
import footer_logo from '../Header/logo.png';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div id="footer_align">
                    <div id="links">
                        <a href="/" className="link_type">HOME</a>
                        <a href="tel:09025526897" className="link_type">CONTACT</a>
                        <a href="/" className="link_type">ABOUT</a>
                    </div>
                    <div className="center_element">
                        <a href="tel:09025526897" id="phone_icon">
                            <p className="material-icons icon_call img_link">call_end</p>
                            <p id="contact" className="img_link">CONTACT DEVELOPER</p>
                        </a>
                    </div>
                    <div id="group_btn">
                        <a href="/sign_in" className="btn_link">SIGN IN</a>
                        <a href="/sign_up" className="btn_link">SIGN UP</a>
                    </div>
                </div>
                <div id="footer_logo_sec">
                    <img src={footer_logo} alt="logo" id="footer_logo"/>
                </div>
                <p id="copy_symbol"><span>&copy;</span> 2020</p>
            </footer>
        )
    }
}

export default Footer