import { staffConstants } from '../_constants';
import _ from 'lodash';

const INIT = {
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    datas: [],
    searchValue: "",
    error: "",
    isError: false,
    isSuccess: false,
    data: null,

    stores: null,
    skills: null,
    message: null
}

export function staffReducer(state = INIT, action) {
    console.log(action.type);
    switch (action.type) {

        case staffConstants.STAFF_GETALL_SUCCESS:
            const { currentPage, pageSize } = action.payload;
            action.payload.datas = action.payload.datas.map(e => {
                return { ...e, counterStatus: (action.payload.datas.indexOf(e) + (currentPage - 1) * pageSize + 1), id: e.username }
            }
            );
            action.payload.datas = _.mapKeys(action.payload.datas, 'id');
            console.log("datas" + action.payload.datas)
            return { ...state, ...action.payload };

        case staffConstants.STAFF_GETALL_FAILURE:
            return { ...state, error: action.payload.error };

        case staffConstants.STAFF_DELETE_SUCCESS:
            console.log('DELETE ' + action.payload);
            let datas = _.omit(state.datas, action.payload);
            let arr = Object.values(datas);
            let datas1 = arr.map(e => {
                return { ...e, counterStatus: (arr.indexOf(e) + (state.currentPage - 1) * state.pageSize + 1), id: e.username }
            }
            );
            console.log(datas1);
            return { ...state, datas: _.mapKeys(datas1, 'id') };

        case staffConstants.STAFF_LOAD:
            return { ...state, data: { ...action.payload.data }, skills: action.payload.skills, stores: action.payload.stores };

        case staffConstants.STAFF_CREATE_FAILURE:
            return { ...state, error: "Fail Create", isError: true, isSuccess: false };

        case staffConstants.STAFF_CREATE_SUCCESS:
            return { ...state, message: "SUCCESS", isError: false, isSuccess: true };

        case staffConstants.STAFF_GET:

            return { ...state, ...action.payload };
        case staffConstants.STAFF_CLEAR_ALERT:
            return { ...state, isSuccess: false, isError: false };
        default:
            return state;
    }
}