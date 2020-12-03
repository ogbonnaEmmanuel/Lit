import React from "react";
import FetchStatus from "./fetch_status";
import './search_bar.css';
import {connect} from 'react-redux';

class CreateModal extends React.Component {

    closeModal = () => {
        this.props.open_create_modal(false);
        this.props.change_link_status(false);
    }

    render() {
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div id="modal_container">
                        <p id="close-modal" onClick={this.closeModal}>&times;</p>
                        <p id="shorten_text">SHORTEN URL</p>
                        <p id="horizontal_line"/>
                        <div id="form_url">
                            <FetchStatus
                                created_url={this.props.created_url}
                                reset_copy_text={this.props.reset_copy_text}
                                loading={this.props.loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) =>{
    return {
        link_created: state.modal_state.link_created
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        open_create_modal: (modal_state) => dispatch({
            type: 'open_create_modal',
            modal_state
        }),
        change_link_status:(link_state) =>dispatch({
            type:'link_created',
            link_state
        })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateModal)