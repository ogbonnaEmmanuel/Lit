import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import currentUserInfo from "../../actions/init_action";

const fetch_data = (props, WrappedComponent) => {

    const data = {
        'username': 'emmanuel',
        'active_links': 4,
        'total_links': 20
    }
    return (props) =>{
        return(<WrappedComponent {...props}/>)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        insertUserData: (user_data) => dispatch(
            currentUserInfo(user_data)
        )
    }
}
export default fetch_data