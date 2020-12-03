import React from "react";
import {connect} from 'react-redux';

class TemplateOrganizer extends React.Component {

    openEditModal = (e) => {
        let id = e.target.id;
        this.props.openUtilModal(id,'edit');
    }

    openDeleteModal = (e)=>{
        let id = this.props.link_data['link_id'];
        this.props.openUtilModal(id,'delete');
    }

    render() {
        return (
            <div className="link_card">
                <div className="link_head">
                    <p className="head_text">{this.props.link_data['alias']}</p>
                </div>
                <div className="link_body">
                    <div className="link_info_group">
                        <p className="link_group_text">VISITORS</p>
                        <p className="link_group_num">
                            {this.props.link_data['visitors']}
                        </p>
                    </div>
                    <div className="link_info_group">
                        <p className="link_group_text">ACTIVE</p>
                        <p className="link_group_num">
                            {
                                this.props.link_data['is_active'] === true ? 'YES' : 'NO'
                            }
                        </p>
                    </div>
                </div>
                <div className="link_footer">
                    <div className="material-icons btn_action edit_btn"
                         id={this.props.link_data['link_id']}
                         onClick={this.openEditModal}
                    >
                        create
                    </div>
                    <div className="material-icons btn_action copy_btn"
                        onClick={this.openDeleteModal}>
                        clear
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openUtilModal: (alias_id,util_type) => dispatch(
            {type: 'set_alias_edit_form_value', alias_id,
                util_type
            })
    }
}

export default connect(null, mapDispatchToProps)(TemplateOrganizer)