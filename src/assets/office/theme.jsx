import {createMuiTheme} from "@material-ui/core";

export default createMuiTheme({
  overrides: {
    MUIDataTable: {
      root: {
        backgroundColor: "#FF000",
      },
      paper: {
        // boxShadow: "none",
        padding: "16px"
      }
    },
    MUIDataTableBodyCell: {
      root: {
        padding: "2px 40px 2px 16px",
      }
    },
    MuiListItem: {
      container: {
        listStyleType: 'none'
      }
    },
    MuiDivider: {
      root: {
        listStyleType: 'none'
      }
    },
    MuiTab: {
      root: {
        '@media (min-width: 960px)': {
          minWidth: 120
        }
      }
    }
  },
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
  // spacing: [4, 8, 12, 16, 20],
  // shadows:["none"],
  props: {
    MuiAppBar: {
      elevation: 3
    },
    MuiCard: {
      raised: false,
      elevation: 0
    },
    MuiInputBase: {
      margin: "dense"
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