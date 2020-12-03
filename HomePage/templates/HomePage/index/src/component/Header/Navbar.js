import React from 'react'
import './navbar.css'
import logo from './logo.png'

class Navbar extends React.Component {

    handleOpen = (e) =>{
        let open_icon = document.getElementById(e.target.id);
        let close_icon = document.getElementById('close_nav')
        let ul = document.querySelector('ul');
        ul.style.display = 'block';
        open_icon.style.display = 'none';
        close_icon.style.display = 'block';
    }
    handleClose = (e) =>{
        let close_icon = document.getElementById(e.target.id);
        let open_icon = document.getElementById('open_nav');
        let ul = document.querySelector('ul');
        ul.style.display = 'none';
        open_icon.style.display = 'block';
        close_icon.style.display = 'none';
    }
    render() {
        return (
            <nav>
                <div className="center_element">
                    <img src={logo} alt="lit logo" id="logo_size"/>
                </div>
                <div className="center_element">
                    <p className="material-icons icon_nav" id="open_nav" onClick={this.handleOpen}>
                        add_circle_outline
                    </p>
                    <p className="material-icons icon_nav" id="close_nav" onClick={this.handleClose}>
                        remove_circle_outline
                    </p>
                </div>
                <div className="center_element">
                    <ul>
                        <li><a href="/">HOME</a></li>
                        <li><a href="/">ABOUT</a></li>
                        <a href="/sign_in" className="auth_btn" id="sign_in">SIGN IN</a>
                        <a href="/sign_up" className="auth_btn" id="sign_up">SIGN UP</a>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar