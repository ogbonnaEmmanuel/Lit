import React from "react";
import logo from "./logo.png";
import user_default_image from "./user.png";
import {connect} from 'react-redux'

class Nav extends React.Component {
    openModal() {
        let modal = document.querySelector('.modal');
        modal.style.display = 'block';
    }

    render() {
        return (
            <nav>
                <img src={logo} id="logo" alt="logo"/>
                <div id="user_info">
                    <div id="user_bar">
                        <img src={user_default_image} id="default_img" alt="user icon"/>
                        <p id="username">{
                            this.props.user
                        }
                        </p>
                        <a href="/sign_out/" className="material-icons" id="off_icon">settings_power</a>
                    </div>
                    <div id="group_btn">
                        <div id="shorten_link" onClick={this.openModal}>SHORTEN LINK</div>
                        <a href="/profile/settings/" id="settings">SETTINGS</a>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.Aggregate.username
    }
}
export default connect(mapStateToProps)(Nav)