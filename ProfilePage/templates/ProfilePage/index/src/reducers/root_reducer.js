const initState = {
    loading: false,
    empty_data:true,
    Aggregate: {
        active_links: null,
        total_visitors: null,
        links_count: null,
        username: null
    },
    unit: {
        user_link_data: [
            // {
            //     alias: 'https',
            //     visitors: 2,
            //     is_active: true,
            //     link_id: 0
            // },
            // {
            //     alias: 'https://www.mltframework.org/assets/img/app/flowblade_screenshot.png',
            //     visitors: 2,
            //     is_active: true,
            //     link_id: 0
            // },
            // {
            //     alias: 'https://www.mltframework.org/assets/img/app/flowblade_screenshot.png',
            //     visitors: 2,
            //     is_active: true,
            //     link_id: 0
            // }
        ]
    },
    form_modal_state: {
        loading: false,
        link_created: false,
        alias_url: null,
        created_url: null,
    },
    edit_alias_data: {
        alias_form_value: '',
        open_edit_modal: false,
        open_delete_modal: false,
        open_error_modal: false,
        error_info: '',
        alias_form_id: null
    }
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'init_data':
            return {
                ...state,
                loading: true
            }
        case 'data_created':
            let Aggregate = state.Aggregate;
            let unit = state.unit;
            Aggregate = action.user_data.Aggregate;
            unit = action.user_data.unit;
            let empty_data = false
            return {
                ...state,
                empty_data,
                Aggregate,
                unit
            }
        case 'set_alias_edit_form_value':
            let alias_id = action['alias_id'];
            let modal_type = action['util_type'];
            let open_edit_modal = false;
            let open_delete_modal = false;
            let alias_form_value = null;
            let unit_data = state.unit.user_link_data;
            alias_id = parseInt(alias_id);
            unit_data.forEach(((value, index) => {
                if (index === alias_id) {
                    alias_form_value = value['alias'];
                }
            }))
            if (modal_type === 'edit') {
                open_edit_modal = true;
            } else {
                open_delete_modal = true
            }
            return {
                ...state,
                edit_alias_data: {
                    alias_form_value,
                    open_edit_modal,
                    open_delete_modal,
                    alias_form_id: alias_id
                }
            }
        case 'close_form_modal':
            return {
                ...state,
                edit_alias_data: {
                    alias_form_value: '',
                    open_edit_modal: false,
                    open_delete_modal: false,
                    open_error_modal: false,
                    alias_form_id: null
                }
            }
        case 'open_error_modal':
            let edit_alias_data = state.edit_alias_data;
            let error_state = false
            if(action['error_state'] === true){
                edit_alias_data.error_info = action['error_info'];
                error_state = true
            }
            edit_alias_data.open_error_modal = error_state
            return {
                ...state,
                edit_alias_data
            }

        default:
            return state
    }
}
export default rootReducer