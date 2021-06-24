import { storeConstants } from '../_constants';

export function stores(state = {}, action) {
    switch (action.type) {
        case storeConstants.STORE_GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case storeConstants.STORE_GETALL_SUCCESS:
            return {
                // ...state,
                items: action.stores,
            };
        case storeConstants.STORE_GETBYID_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case storeConstants.STORE_GETBYID_REQUEST:
            return {
                ...state,
                loading: true
            };
        case storeConstants.STORE_GETBYID_SUCCESS:
            return {
                ...state,
                ..._.mapKeys(action.payload, 'id'),
            };
        case storeConstants.STORE_GETBYID_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case storeConstants.STORE_CREAT_REQUEST:
            return {
                ...state,
                creating: true
            };
        case storeConstants.STORE_CREAT_SUCCESS:
            return {
                ...state,
                created: true
            };
        case storeConstants.STORE_CREAT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case storeConstants.STORE_UPDATE_REQUEST:
            return {
                ...state,
                updating: true
            };
        case storeConstants.STORE_UPDATE_SUCCESS:
            return {
                ...state,
                items: action.store
            };
        case storeConstants.STORE_UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case storeConstants.STORE_DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(brand =>
                    brand.id === action.id
                        ? { ...user, deleting: true }
                        : brand
                )
            };
        case storeConstants.STORE_DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(brand => brand.id !== action.id)
            };
        case storeConstants.STORE_GETALL_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(brand => {
                    if (brand.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...storeCopy } = brand;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...storeCopy, deleteError: action.error };
                    }

                    return brand;
                })
            };
        default:
            return state
    }
}