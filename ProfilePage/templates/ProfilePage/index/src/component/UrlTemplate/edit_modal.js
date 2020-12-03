import React from "react";
import './edit_modal.css';
import FetchStatus from "../TopNav/fetch_status";
import currentUserInfo from "../../actions/init_action";
import {connect} from 'react-redux';

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            link_created: false,
            created_url: false,
            reset_copy_text: null,
            alias_value: null,
            form_error_id: null,
        }
    }


    updateFormValue = (e) => {
        let alias_value = e.target.value;
        this.setState({
            alias_value
        })
    }

    closeModal = () => {
        this.props.close_form_modal(1);
        let form_container = document.getElementById('form_input_container');
        form_container.style.display = 'block';
        let error_id = 'error_' + this.props.alias_form['alias_form_id'];
        document.getElementById(error_id).textContent = '';
        this.setState({
            link_created: false,
            reset_copy_text: false,
            loading: false
        })
        form_container.reset();
    }

    validateUrl = (alias_value) => {
        if (alias_value === null) {
            let error_id = 'error_' + this.props.alias_form['alias_form_id'];
            document.getElementById(error_id).textContent = 'this field is required';
            return false;
        }
        return true;
    }

    EditAlias = () => {
        let alias_value = this.state.alias_value;
        if (this.validateUrl(alias_value)) {
            let form_container = document.getElementById('modal_form_input_container');
            form_container.style.display = 'none';
            this.setState({loading: true});
            let previous_alias = this.props.alias_form['alias_form_value'];
            const formData = new FormData();
            formData.append('alias', alias_value);
            formData.append('previous_alias', previous_alias);
            fetch('/profile/edit_alias/', {
                method: 'POST',
                body: formData
            }).then(response => response.json()).then(data => {
                this.setState({
                    loading: false,
                    link_created: true,
                    created_url: data['created_alias']
                })
                this.props.update_data(data);
            }).catch(error => {
                this.props.close_form_modal(1)
                let msg = 'Please check your internet connection';
                this.props.open_error_modal(true, msg);
            })
        }
    }

    render() {
        return (
            <div id="myModal" className="form_modal">
                <div className="form_modal-content">
                    <div id="modal_container">
                        <p id="form_close-modal" onClick={this.closeModal}>&times;</p>
                        <p id="shorten_text">EDIT ALIAS</p>
                        <p id="horizontal_line"/>
                        <div id="form_url">
                            <FetchStatus
                                loading={this.state.loading}
                                link_created={this.state.link_created}
                                created_url={this.state.created_url}
                                reset_copy_text={this.state.reset_copy_text}
                            />
                            <form id="modal_form_input_container">
                                <div>
                                    <input type="text"
                                           className="form_input"
                                           id={this.props.alias_form['alias_form_id']}
                                           placeholder={this.props.alias_form['alias_form_value']}
                                           onChange={this.updateFormValue}
                                    />
                                    <p className="error_text"
                                       id={'error_' + this.props.alias_form['alias_form_id']}
                                    />
                                </div>
                                <div id="submit_btn" onClick={this.EditAlias}>
                                    EDIT ALIAS
                                </div>
                            </form>
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
        close_form_modal: (id) => dispatch({type: 'close_form_modal', id}),
        open_error_modal: (error_state, error_info) => dispatch({
            type: 'open_error_modal',
            error_state,
            error_info
        })
    }
}

const mapStateToProps = (state) => {
    return {
        alias_form: state.edit_alias_data,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)