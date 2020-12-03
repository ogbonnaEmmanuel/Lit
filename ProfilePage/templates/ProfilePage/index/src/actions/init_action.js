
const currentUserInfo = (user_data) => {
    return (dispatch, getState) => {
        dispatch({type: 'init_data_start',user_data},)
        fetch('/profile/user_links_info/').then(res => res.json())
        .then(user_data => {
            dispatch({type:'data_created',user_data})
        }).catch(error=>{
            let error_state = true;
            let error_info = 'Please check your internet connection';
            dispatch({type:'open_error_modal',error_state,error_info})
        })
    }
}
export default currentUserInfo