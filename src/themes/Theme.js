import { createMuiTheme } from "@material-ui/core/styles";
import { themeTypography } from './typography';
import { value } from '../themes/ThemeConstant';
import { componentStyleOverrides } from "./compStyleOverride";

const customWhite = "#fff";
const purple = '#3751FF';
const purpleMin = '#e3f2fd';

let navObject = {
    paper: '',
    backgroundDefault: '',
    background: '',
    textPrimary: '',
    textSecondary: '',
    textDark: '',
    menuSelected: '',
    menuSelectedBack: '',
    divider: '',
    borderRadius: 6

};

navObject.paper = customWhite;
navObject.backgroundDefault = value.paper;
navObject.background = value.blue50;
navObject.textPrimary = value.grey700;
navObject.textSecondary = value.grey500;
navObject.textDark = value.grey900;
navObject.menuSelected = purple;
navObject.menuSelectedBack = value.blue50;
navObject.divider = value.blue50;
navObject.borderRadius = 6;


export default createMuiTheme({
    palette: {
        primary: {
            main: purple,
            contrastText: '#fff',
        },

        common: {
            white: customWhite,
            purpleBg: purpleMin,
            blue50: value.blue50
        },
        danger: {
            main: '#c70000'
        },
        background: {
            default: customWhite
        }

    },
    typography: themeTypography(navObject),
    overrides: componentStyleOverrides(navObject),


});