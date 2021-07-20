
export const levels = [
    {
        label: "Beginner", value: 1, color: "#a4fd3f"
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

export const levelInit = levels[0];

