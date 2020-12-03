import React from "react";
import TemplateOrganizer from "./TemplateOrganizer";
import './template_organizer.css';
import {connect} from 'react-redux';
import EditModal from "./edit_modal";
import DeleteModal from "./delete_modal";
import ErrorModal from "./error_modal";

class TemplateFetcher extends React.Component {



    render() {
        return (
            <div>
                <div id="center_grid">
                    <div id="grid">
                        {this.props.links && this.props.links.map((link_data, index) => {
                            return (
                                <TemplateOrganizer
                                    link_data={link_data}
                                    key={index}
                                />
                            )
                        })}
                    </div>
                </div>
                {this.props.open_edit_modal ? <EditModal/> : ''}
                {this.props.open_delete_modal ? <DeleteModal/> : ''}
                {this.props.open_error_modal ? <ErrorModal error_info={this.props.error_info}/> : ''}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        links: state.unit.user_link_data,
        open_edit_modal: state.edit_alias_data.open_edit_modal,
        open_delete_modal: state.edit_alias_data.open_delete_modal,
        open_error_modal: state.edit_alias_data.open_error_modal,
        open_error_info: state.edit_alias_data.error_info,
    }
}

export default connect(mapStateToProps)(TemplateFetcher)