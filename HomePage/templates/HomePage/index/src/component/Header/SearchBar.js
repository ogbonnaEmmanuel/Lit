import React from "react";
import './search_bar.css';
import {connect} from 'react-redux';
import CreateModal from "./create_modal";
import ErrorModal from "./error_modal";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            alias_value: null,
            created_url: null,
            reset_copy_text: false,
        }
    }

    generateRandomAlias = () => {
        const data = {
            "jsonrpc": "2.0",
            "method": "generateStrings",
            "params": {
                "apiKey": "27168a9e-505c-482a-9e28-8290c35db981",
                "n": 1,
                "length": 8,
                "characters": "abcdefghijklmnopqrstuvwxyz",
                "replacement": true
            },
            "id": 42
        }

        return new Promise((resolve, reject) => {
            fetch('https://api.random.org/json-rpc/2/invoke', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    resolve({data: data['result']['random']['data'][0]});
                })
                .catch((error) => {
                    this.props.open_create_modal(false);
                    let msg = 'Please check your internet connection';
                    this.props.open_error_modal(true, msg);
                    reject({'error': error})
                });
        })
    }

    createUrl = (url_value, alias_value) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('url', url_value);
            formData.append('alias', alias_value);
            fetch('/profile/create_link/', {
                method: 'POST',
                body: formData
            }).then(response => response.json()).then(data => {
                if (data['response'] === 'invalid') {
                    let msg = 'Please input a valid url';
                    this.props.open_create_modal(false);
                    this.props.open_error_modal(true, msg);
                    this.props.change_link_status(false);
                    this.setState({
                        loading: false,
                        created_url: data['response']
                    })
                    reject({error: 'invalid'});
                } else {
                    this.props.change_link_status(true);
                    this.setState({
                        loading: false,
                        created_url: data['response']
                    })
                    resolve({data: data})
                }

            }).catch(error => {
                this.props.open_create_modal(false);
                let msg = 'Please check your internet connection';
                this.props.open_error_modal(true, msg);
            })
        })
    }

    shortenUrl = () => {
        this.props.open_create_modal(true);
        this.setState({loading: true});
        let input_url_value = document.getElementById('search_box').value;
        let inside_func = this;

        async function get_alias_value() {
            const alias_value = await inside_func.generateRandomAlias();
            await inside_func.createUrl(input_url_value, alias_value['data']);
        }

        get_alias_value().then(data => {
            console.log(data);
        })
    }

    render() {
        return (
            <div>
                <div className="search_center">
                    <div className="center_element">
                        <input type="text" id="search_box" placeholder="Paste Your Url"/>
                    </div>
                    <div className="center_element">
                        <div id="search_btn" onClick={this.shortenUrl}>Shorten Link</div>
                    </div>
                    {this.props.create_modal_state ? <CreateModal
                        created_url={this.state.created_url}
                        reset_copy_text={this.state.reset_copy_text}
                        loading={this.state.loading}/> : ''}
                    {this.props.open_error_state ? <ErrorModal/> : ''}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        create_modal_state: state.modal_state.create_modal,
        open_error_state: state.modal_state.error_modal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        open_create_modal: (modal_state) => dispatch({
            type: 'open_create_modal',
            modal_state
        }),
        open_error_modal: (error_state, error_info) => dispatch({
            type: 'open_error_modal',
            error_state,
            error_info,
        }),
        change_link_status: (link_state) => dispatch({
            type: 'link_created',
            link_state
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)