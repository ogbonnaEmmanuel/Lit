import React from "react";
import './top_nav.css';
import Nav from "./Nav";
import FetchStatus from "./fetch_status";
import {connect} from 'react-redux';
import currentUserInfo from "../../actions/init_action";


class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            link_created: false,
            alias_url: null,
            created_url: null,
            reset_copy_text: false
        }
    }

    closeModal = () => {
        let modal = document.querySelector('.modal');
        modal.style.display = 'none';
        let form_container = document.getElementById('form_input_container');
        form_container.style.display = 'block';
        document.getElementById('url_error').textContent = '';
        this.setState({
            link_created: false,
            reset_copy_text: false,
            loading: false,
        })
        form_container.reset();
    }

    shortenUrl = () => {
        let url_value = document.getElementById('url_input').value;
        let alias_value = document.getElementById('alias').value;
        if (url_value === '') {
            document.getElementById('url_error').textContent = 'this field is required';
        } else if (alias_value === '') {
            document.getElementById('alias_error').textContent = 'this field is required';
        } else {
            let form_container = document.getElementById('form_input_container');
            form_container.style.display = 'none';
            this.setState({loading: true})
            const formData = new FormData();
            formData.append('url', url_value);
            formData.append('alias', alias_value);
            fetch('/profile/create_link/', {
                method: 'POST',
                body: formData
            }).then(response => response.json()).then(data => {
                if (data['response'] === 'invalid') {
                    this.setState({
                        loading: false,
                        link_created: false,
                        created_url: data['response']
                    })
                    this.closeModal();
                    this.props.open_error_modal(true, 'Please input a valid url');
                } else {
                    this.setState({
                        loading: false,
                        link_created: true,
                        created_url: data['response']
                    })
                    this.props.update_data(data);
                }
            }).catch(error => {
                this.closeModal();
                this.props.open_error_modal(true, 'Please check your internet connection');
            })
        }
    }


    render() {
        return (
            <div>
                <Nav/>
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <div id="modal_container">
                            <p id="close-modal" onClick={this.closeModal}>&times;</p>
                            <p id="shorten_text">SHORTEN URL</p>
                            <p id="horizontal_line"/>
                            <div id="form_url">
                                <FetchStatus
                                    loading={this.state.loading}
                                    link_created={this.state.link_created}
                                    created_url={this.state.created_url}
                                    reset_copy_text={this.state.reset_copy_text}
                                />
                                <form id="form_input_container">
                                    <div>
                                        <input type="text"
                                               className="form_input"
                                               placeholder="paste url"
                                               id="url_input"
                                        />
                                        <p className="error_text" id="url_error"/>
                                    </div>
                                    <div id="arrow_container">
                                        <p id="arrow_icon">&#8597;</p>
                                        <p id="arrow_text">
                                            ALIAS
                                        </p>
                                    </div>
                                    <div>
                                        <input type="text"
                                               className="form_input"
                                               placeholder="lit/app_name"
                                               id="alias"
                                        />
                                        <p className="error_text" id="alias_error"/>
                                    </div>
                                    <div id="submit_btn" onClick={this.shortenUrl}>
                                        SHORTEN URL
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update_data: (update_data) => dispatch(currentUserInfo(update_data)),
        open_error_modal: (error_state, error_info) => dispatch(
            {
                type: 'open_error_modal',
                error_state,
                error_info
            })
    }
}

export default connect(null, mapDispatchToProps)(TopNav)