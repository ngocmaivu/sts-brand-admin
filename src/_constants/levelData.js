import { Chip } from "@material-ui/core";

export const levels = [
    {
        label: "Beginner", value: 1, color: "#cbf9d9"
    },
    {
        label: "Intermediate", value: 2, color: "#75ebeb"
    },
    {
        label: "Experience", value: 3, color: "#eb7575"
    },
];



export function getLevelLable(value) {

    let level = levels.find(lv => lv.value == value);
    if (level) {
        return level.label;
    }
    return "Out of system level";
}
export function getLevelColor(value) {
    let level = levels.find(lv => lv.value == value);
    if (level) {
        return level.color;
    }
    return "#fff";
}

export function renderLevelLableChip(value) {
    return <Chip label={getLevelLable(value)} variant="outlined" style={{ 
        backgroundColor:  getLevelColor(value),
        //  border: `1px solid ${ getLevelColor(value)}`, 
        //  color: getLevelColor(value)
         }} />
}

export const levelInit = levels[0];

