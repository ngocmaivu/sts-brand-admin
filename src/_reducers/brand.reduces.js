import { brandConstants } from '../_constants';

export function brand(state = {}, action) {
    switch (action.type) {
        case brandConstants.BRAND_GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case brandConstants.BRAND_GETALL_SUCCESS:
            return {
                ...state,
                items: action.brands,
            };
        case brandConstants.BRAND_GETBYID_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case brandConstants.BRAND_GETBYID_REQUEST:
            return {
                ...state,
                loading: true
            };
        case brandConstants.BRAND_GETBYID_SUCCESS:
            return {
                ...state,
                items: action.brand,
            };
        case brandConstants.BRAND_GETBYID_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case brandConstants.BRAND_CREAT_REQUEST:
            return {
                ...state,
                creating: true
            };
        case brandConstants.BRAND_CREAT_SUCCESS:
            return {
                ...state,
                created: true
            };
        case brandConstants.BRAND_CREAT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case brandConstants.BRAND_UPDATE_REQUEST:
            return {
                ...state,
                updating: true
            };
        case brandConstants.BRAND_UPDATE_SUCCESS:
            return {
                ...state,
                items: action.brand
            };
        case brandConstants.BRAND_UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case brandConstants.BRAND_DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(brand =>
                    brand.id === action.id
                        ? { ...brand, deleting: true }
                        : brand
                )
            };
        case brandConstants.BRAND_DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(brand => brand.id !== action.id)
            };
        case brandConstants.BRAND_GETALL_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(brand => {
                    if (brand.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...brandCopy } = brand;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...brandCopy, deleteError: action.error };
                    }

                    return brand;
                })
            };
        default:
            return state
    }
}