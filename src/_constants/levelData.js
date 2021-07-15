
export const levels = [
    {
        label: "Beginner", value: 1
    },
    {
        label: "Intermediate", value: 2
    },
    {
        label: "Experience", value: 3
    },
];

export function getLevelLable(value) {
    let level = levels.find(lv => lv.value == value);
    if (level) {
        return level.label
    }
    return "Out of system level";
}

export const levelInit = levels[0];

