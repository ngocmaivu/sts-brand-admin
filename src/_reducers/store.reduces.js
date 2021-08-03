import { storeConstants } from '../_constants';

export function stores(state = {}, action) {
    switch (action.type) {
        case storeConstants.STORE_GETALL_REQUEST:
            return {
                // ...state,
                loading: true
            };
        case storeConstants.STORE_GETALL_SUCCESS:
            return {
                // ...state,
                items: action.stores,
                type: action.type,
            };
        case storeConstants.STORE_GETBYID_FAILURE:
            return {
                // ...state,
                error: action.error
            };
        case storeConstants.STORE_GETBYID_REQUEST:
            return {
                // ...state,
                loading: true
            };
        case storeConstants.STORE_GETBYID_SUCCESS:
            return {
                // ...state,
                items: action.store,
                type: action.type,
            };
        case storeConstants.STORE_GETBYID_FAILURE:
            return {
                // ...state,
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

        case storeConstants.MANAGER_STORE_UPDATE_REQUEST:
            return {
                ...state,
                updating: true
            };
        case storeConstants.MANAGER_STORE_UPDATE_SUCCESS:
            return {
                ...state,
                items: action.store
            };
        case storeConstants.MANAGER_STORE_UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case storeConstants.STORE_DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(store =>
                    store.id === action.id
                        ? { ...store, deleting: true }
                        : store
                )
            };
        case storeConstants.STORE_DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(store => store.id !== action.id),
                type: action.type,
            };
        case storeConstants.STORE_GETALL_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(store => {
                    if (store.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...storeCopy } = store;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...storeCopy, deleteError: action.error };
                    }

                    return store;
                })
            };
        default:
            return state
    }
}

// import { storeConstants } from '../_constants';
// import _ from 'lodash';

// const INIT = {
//     currentPage: 1,
//     pageSize: 10,
//     totalCount: 0,
//     totalPages: 0,
//     datas: [],
//     searchValue: "",
//     error: "",
//     data: null,

//     stores: null,
//     skills: null,
//     message: null
// }

// export function storeReducer(state = INIT, action) {
//     console.log(action.type);
//     switch (action.type) {

//         case storeConstants.STORE_GETALL_SUCCESS:
//             const { currentPage, pageSize } = action.payload;
//             action.payload.datas = action.payload.datas.map(e => {
//                 return { ...e, counterStatus: (action.payload.datas.indexOf(e) + (currentPage - 1) * pageSize + 1), id: e.username }
//             }
//             );
//             action.payload.datas = _.mapKeys(action.payload.datas, 'id');
//             console.log("datas" + action.payload.datas)
//             return { ...state, ...action.payload };

//         case storeConstants.STORE_GETALL_FAILURE:
//             return { ...state, error: action.payload.error };

//         case storeConstants.STORE_DELETE_SUCCESS:
//             console.log('DELETE ' + action.payload);
//             let datas = _.omit(state.datas, action.payload);
//             let arr = Object.values(datas);
//             let datas1 = arr.map(e => {
//                 return { ...e, counterStatus: (arr.indexOf(e) + (state.currentPage - 1) * state.pageSize + 1), id: e.username }
//             }
//             );
//             console.log(datas1);
//             return { ...state, datas: _.mapKeys(datas1, 'id') };

//         // case storeConstants.STORE_CREAT_SUCCESS:
//         //     return { ...state, data: action.payload.data, skills: action.payload.skills, stores: action.payload.stores };

//         case storeConstants.STORE_CREAT_FAILURE:
//             return { ...state, error: "Fail Create" };

//         case storeConstants.STORE_CREAT_SUCCESS:
//             return { ...state, message: "SUCCESS" };

//         case storeConstants.STORE_GETBYID_SUCCESS:
            
//             return { ...state, ...action.payload };

//         default:
//             return state;
//     }
// }