import { scheduleConstants } from '../_constants';
import _ from 'lodash';

const INIT = {
    template: null
}

export function scheduleReducer(state = INIT, action) {
    console.log(action.type);
    switch (action.type) {

        case scheduleConstants.SCHEDULE_DATA_INPUT:
            return { ...state, template: action.payload }

        default:
            return state;
    }
}