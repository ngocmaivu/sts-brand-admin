import { skillConstants } from "../_constants/skill.constants";

export function skill(state = {}, action) {
    switch (action.type) {
        case skillConstants.SKILL_GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case skillConstants.SKILL_GETALL_SUCCESS:
            return {
                ...state,
                items: action.skills,
                type: action.type,
            };
        case skillConstants.SKILL_GETALL_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case skillConstants.SKILL_CREAT_REQUEST:
            return {
                ...state,
                creating: true
            };
        case skillConstants.SKILL_CREAT_SUCCESS:
            return {
                ...state,
                created: true
            };
        case skillConstants.SKILL_CREAT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case skillConstants.SKILL_UPDATE_REQUEST:
            return {
                ...state,
                updating: true
            };
        case skillConstants.SKILL_UPDATE_SUCCESS:
            return {
                ...state,
                items: action.SKILL
            };
        case skillConstants.SKILL_UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case skillConstants.SKILL_DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(SKILL =>
                    SKILL.id === action.id
                        ? { ...SKILL, deleting: true }
                        : SKILL
                )
            };
        case skillConstants.SKILL_DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(SKILL => SKILL.id !== action.id),
                type: action.type,
            };
        case skillConstants.SKILL_GETALL_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(SKILL => {
                    if (SKILL.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...SKILLCopy } = SKILL;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...SKILLCopy, deleteError: action.error };
                    }

                    return SKILL;
                })
            };
        default:
            return state
    }
}