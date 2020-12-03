import React from "react";
import './error_modal.css';
import {connect} from 'react-redux';

class ErrorModal extends React.Component {
    CloseErrorModal = ()=>{
        this.props.close_error_modal(false,'');
    }
    render() {
        return (
            <div id="myModal" className="error_modal">
                <div className="error_container">
                    <div className="error_content">
                        <p className="material-icons center_element error_icon">
                            warning
                        </p>
                        <p className="center_element" id="snap_text">
                            oh snap!
                        </p>
                        <p className="center_element" id="error_text">
                            {this.props.error_info}
                        </p>
                        <div id="dismiss_btn"
                        onClick={this.CloseErrorModal}>
                            Dismiss
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        error_info: state.edit_alias_data.error_info
    }
}
const mapDispatchToProps = (dispatch =>{
   return {
    close_error_modal:(error_state,error_info)=>{dispatch({
        type:'open_error_modal',
        error_state,
        error_info
    })}
   }
})
export default connect(mapStateToProps,mapDispatchToProps)(ErrorModal)