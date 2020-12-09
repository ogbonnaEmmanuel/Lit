import React from "react";
import TemplateOrganizer from "./TemplateOrganizer";
import './template_organizer.css';
import {connect} from 'react-redux';
import EditModal from "./edit_modal";
import DeleteModal from "./delete_modal";
import ErrorModal from "./error_modal";
import empty from "./empty.jpg";

class TemplateFetcher extends React.Component {

    emptyData = () => {
        if (this.props.links.length === 0) {
            return (
                <div>
                    <img src={empty} id="empty_img" alt="empty vector"/>
                    <p id="shorten_text">
                        START SHORTENING YOUR LINKS
                    </p>
                </div>
            )
        }
    }

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
                    {this.emptyData()}
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
        empty_data: state.empty_data,
    }
}

export default connect(mapStateToProps)(TemplateFetcher)