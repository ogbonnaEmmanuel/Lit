const updateUserInfo = (update_data) => {
    return (dispatch, getState) => {
        dispatch({type: 'update_data', update_data},)
    }
}
export default updateUserInfo