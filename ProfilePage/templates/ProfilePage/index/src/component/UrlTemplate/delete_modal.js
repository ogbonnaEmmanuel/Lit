import React from "react";
import './delete_modal.css';
import currentUserInfo from "../../actions/init_action";
import {connect} from 'react-redux';

class DeleteModal extends React.Component {

    closeModal = () => {
        this.props.close_form_modal(1);
    }

    DeleteAlias = () => {
        let current_alias = this.props.alias_form['alias_form_value'];
        const formData = new FormData();
        formData.append('current_alias', current_alias);
        fetch('/profile/delete_alias/', {
            method: 'POST',
            body: formData
        }).then(response => response.json()).then(data => {
            this.props.update_data(data);
            this.props.close_form_modal(1);
        }).catch(error => {
            this.closeModal();
            let msg = 'Please check your internet connection';
            this.props.open_error_modal(true,msg);
        })
    }

    render() {
        return (
            <div id="myModal" className="cl_form_modal">
                <div className="cl_form_modal-content">
                    <div id="modal_container">
                        <p id="shorten_text">DELETE ALIAS</p>
                        <p id="horizontal_line"/>
                        <div id="form_url">
                            <div id="cl_modal_form_input_container">
                                <div id="cl_form_text">
                                    <p id="cl_text_warning">
                                        Are you sure you want to delete
                                    </p>
                                    <p id="cl_text_url">
                                        {this.props.alias_form['alias_form_value']}
                                    </p>
                                </div>
                                <div id="cl_btn_group">
                                    <p className="cl_btn" id="cl_yes_btn"
                                    onClick={this.DeleteAlias}>
                                        YES
                                    </p>
                                    <p className="cl_btn" id="cl_no_btn"
                                    onClick={this.closeModal}>
                                        NO
                                    </p>
                                </div>
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
        close_form_modal: (id) => dispatch({type: 'close_form_modal', id}),
        open_error_modal:(error_state,error_info)=>dispatch({
            type:'open_error_modal',
            error_state,
            error_info,
        })
    }
}

const mapStateToProps = (state) => {
    return {
        alias_form: state.edit_alias_data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal)