import React from "react";
import './user_info.css'
import {connect} from "react-redux";
import currentUserInfo from "../../actions/init_action";

class UserInfo extends React.Component {

    componentDidMount() {
        this.props.update('user')
    }

    render() {
        return (
            <div id="user_info_index">
                <div className="info_group">
                    <p className="info_text">LINKS</p>
                    <p className="info_number">{this.props.user_info.links_count}</p>
                </div>
                <div className="info_group">
                    <p className="info_text">TOTAL VISITORS</p>
                    <p className="info_number">{this.props.user_info.total_visitors}</p>
                </div>
                <div className="info_group">
                    <p className="info_text">ACTIVE LINKS</p>
                    <p className="info_number">{this.props.user_info.active_links}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user_info: state.Aggregate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: (data) => dispatch(currentUserInfo(data))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserInfo)