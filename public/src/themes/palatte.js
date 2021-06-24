import { value } from '../themes/ThemeConstant';

/**
 * Color intention that you want to used in your theme
 */

const customWhite = "#fff";
const purple = '#3751FF';
const purpleMin = '#e3f2fd';
const tmp = {
    primary: {
        main: purple,
        contrastText: '#fff',
    },

    common: {
        white: customWhite,
        purpleBg: purpleMin
    },
    danger: {
        main: '#c70000'
    },
    background: {
        default: customWhite
    }

};
export function themePalatte(navObject) {
    return {
        common: {
            black: value.paperDark,
            white: customWhite,
            purpleBg: purpleMin
        },
        primary: {
            // light: value.blue50,
            main: purple,
            // dark: value.blue600,
            // 200: value.blue200,
            // 800: value.blue800
        },
        secondary: {
            light: value.deepPurple50,
            main: purple,
            dark: value.deepPurple600,
            200: value.deepPurple200,
            800: value.deepPurple800
        },
        purple: {
            light: value.deepPurple50,
            main: value.deepPurple500,
            dark: value.deepPurple600,
            200: value.deepPurple200,
            800: value.deepPurple800
        },
        error: {
            light: value.red200,
            main: value.red500,
            dark: value.red800
        },
        orange: {
            light: value.deepOrange50,
            main: value.deepOrange200,
            dark: value.deepOrange800
        },
        warning: {
            light: value.amber50,
            main: value.amber100,
            dark: value.amber500
        },
        success: {
            light: value.A100,
            main: value.A200,
            dark: value.A700
        },
        grey: {
            50: value.grey50,
            100: value.grey100,
            200: value.grey200,
            300: value.grey300,
            500: navObject.textSecondary,
            600: navObject.textPrimary,
            900: navObject.textDark
        },
        text: {
            primary: navObject.textPrimary,
            secondary: navObject.textSecondary,
            dark: navObject.textDark,
            hint: value.grey100
        },
        background: {
            paper: navObject.paper,
            default: navObject.backgroundDefault
        }
    };
}
