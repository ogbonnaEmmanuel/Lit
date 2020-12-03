const initState = {
    modal_state: {
        error_modal: false,
        create_modal:false,
        error_info:'',
    },
    link_created:false,
}
const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case "open_create_modal":
            let modal_state = state.modal_state;
            modal_state.create_modal = action['modal_state'];
            return {
                ...state,
                modal_state
            }
        case 'open_error_modal':
            let current_modal_state = state.modal_state;
            current_modal_state.error_modal = action['error_state'];
            current_modal_state.error_info = action['error_info'];
            return {
                ...state,
                modal_state: current_modal_state
            }
        case 'link_created':
            return {
                ...state,
                link_created: action['link_state']
            }
        default:
            return state

    }
}
export default rootReducer