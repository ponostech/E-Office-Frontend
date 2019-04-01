import {createMuiTheme} from "@material-ui/core";

export default createMuiTheme({
    typography: {
        useNextVariants: true
    },
    palette: {
        primary: {
            main: "#26B99A",
            contrastText: "#fff"
        },
        secondary: {
            main: "#b93e46",
            contrastText: "#fff"
        }
    },
    spacing: [4, 8, 12, 16, 20],
    // shadows:["none"],
    props: {
        MuiAppBar: {
            elevation: 2
        },
        MuiCard: {
            raised: false,
            elevation: 0
        },
        MuiInput: {
            color: "#26B99A"
        },
        // Name of the component ⚛️
        MuiButtonBase: {
            // The properties to apply
            disableRipple: true, // No more ripple, on the whole application 💣!
            color: "#fff"
        }
    }
});